import { Response } from 'express';
import { IAddressesRepository } from '@domain/repositories/IAddressesRepository';
import { IContactsRepository } from '@domain/repositories/IContactsRepository';
import { IIndividualsRepository } from '@domain/repositories/IIndividualsRepository';
import { IUsersRepository } from '@domain/repositories/IUsersRepository';
import { BCryptProvider } from '@shared/providers/hash/implementations/BCryptProvider';
import { ICreateIndividualBody } from '@domain/types/ICreateIndividualBody';
import { ISpekeasyProvaider } from '@shared/providers/speakeasy/ISpekeasyProvider';
import { IMailProvider } from '@shared/providers/mail/IMailProvider';
import { IQrcodeProvider } from '@shared/providers/qrcode/IQrcodeProvider';
import { User } from '@domain/infra/entities/User';
import { ICreateUser } from '@domain/types/ICreateUser';
import { Individual } from '@domain/infra/entities/Individual';
import { Address } from '@domain/infra/entities/Addresses';
import {
  ICreateIndividual,
  ICreateIndividualRequest,
} from '@domain/types/ICreateIndividual';
import { ICreateAddress } from '@domain/types/ICreateAddress';
import { ICreateContact } from '@domain/types/ICreateContact';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { ITransactionsRepository } from '@domain/repositories/ITransactionsRepository';
import { regexValidation } from '@shared/utils/regexValidation';

class CreateIndividualUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private contactsRepository: IContactsRepository,
    private addressesRepository: IAddressesRepository,
    private individualsRepository: IIndividualsRepository,
    private spekeasyProvaider: ISpekeasyProvaider,
    private mailProvider: IMailProvider,
    private qrcodeProvider: IQrcodeProvider,
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async createUser(
    dataUser: ICreateUser,
    queryRunner?: QueryRunner,
    res?: Response,
  ): Promise<User> {
    const bCryptProvider = new BCryptProvider();
    const userExists = await this.usersRepository.findByEmail(dataUser.email);
    const secret = await this.spekeasyProvaider.generate();
    if (userExists) {
      throw res.json({ error: 'User already exists' }).status(400);
    }
    const passwordHash = await bCryptProvider.hash(dataUser.hashPassword);

    const userRequest = {
      email: dataUser.email,
      hashPassword: passwordHash,
      secret: secret.base32,
    };

    const userResponse = await this.usersRepository.store(
      userRequest,
      queryRunner,
    );
    return userResponse;
  }

  private async createIndividual(
    individual: ICreateIndividualRequest,
    userId: number,
    queryRunner?: QueryRunner,
    res?: Response,
  ): Promise<Individual> {
    regexValidation({
      expression: /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/,
      value: individual.cpf,
      messageError: 'Invalid CPF format',
    });
    individual.cpf = individual.cpf.replace(/[^0-9]+/g, '');

    const individualExists = await this.individualsRepository.findByCpf(
      individual.cpf,
    );

    if (individualExists) {
      throw res.json({ error: 'Individual already exists' }).status(400);
    }
    const requestIndividual: ICreateIndividual = {
      cpf: individual.cpf,
      name: individual.name,
      birthDate: new Date(individual.birthDate),
      gender: await this.enumGender(individual.gender),
      userId,
    };

    const individualResponse = await this.individualsRepository.store(
      requestIndividual,
      queryRunner,
    );

    return individualResponse;
  }

  private async createAddress(
    address: ICreateAddress,
    individualId: number,
    queryRunner?: QueryRunner,
  ): Promise<Address> {
    const newZipCode = address.zipCode.replace(/[^0-9]+/g, '');

    const addressRequest = {
      street: address.street,
      neighborhood: address.neighborhood,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      zipCode: newZipCode,
      individualId,
    };

    const addressResponse = await this.addressesRepository.store(
      addressRequest,
      queryRunner,
    );

    return addressResponse;
  }

  private async createContact(
    contacts: ICreateContact[],
    individualId: number,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    contacts.forEach((contact, index) => {
      contacts[index].info = contact.info.replace(/[^0-9]+/g, '');
    });
    Promise.all(
      contacts.map(async contact => {
        await this.contactsRepository.store(
          {
            info: contact.info,
            type: contact.type,
            individualId,
          },
          queryRunner,
        );
      }),
    );
  }

  private async sendMail(
    secret: string,
    name: string,
    email: string,
  ): Promise<void> {
    const qrcode = await this.qrcodeProvider.generate(
      `otpauth://totp/Sistema de Marcação?secret=${secret}`,
    );

    await this.mailProvider.send(
      email,
      'Sistema de Marcação - Redefinição de senha',
      {
        name,
        qrcode,
        secret,
      },
      './src/shared/views/mails/createIndividual.hbs',
    );
  }

  private async enumGender(gender: string, res?: Response): Promise<number> {
    switch (gender) {
      case 'Masculino':
        return 0;
      case 'Feminino':
        return 1;
      default:
        throw res.json({ error: 'gender not found' }).status(400);
    }
  }

  async execute(data: ICreateIndividualBody, res?: Response): Promise<void> {
    const queryRunner = await this.transactionsRepository.startTransactions();

    try {
      const user = await this.createUser(data.user, queryRunner);

      const individual = await this.createIndividual(
        data.individual,
        user.id,
        queryRunner,
      );

      await this.createAddress(data.address, individual.id, queryRunner);

      await this.createContact(data.contacts, individual.id, queryRunner);

      await this.sendMail(user.secret, individual.name, user.email);

      await this.transactionsRepository.commitTransaction(queryRunner);
    } catch (err) {
      await this.transactionsRepository.rollback(queryRunner);
      throw res.json(err.body).status(err.statusCode);
    }
  }
}

export { CreateIndividualUseCase };
