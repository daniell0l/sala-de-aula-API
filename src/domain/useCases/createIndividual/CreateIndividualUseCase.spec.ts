import { AddressesRepository } from '@domain/people/infra/typeorm/repositories/AddressesRepository';
import { ContactsRepository } from '@domain/people/infra/typeorm/repositories/ContactsRepository';
import { IndividualRepository } from '@domain/people/infra/typeorm/repositories/IndividualRepository';
import { TransactionsRepository } from '@domain/people/infra/typeorm/repositories/TransactionsRepository';
import { UserRepository } from '@domain/people/infra/typeorm/repositories/UserRepository';
import { AddressesRepositoryFactory } from '@domain/people/repositories/factories/AddressesRepositoryFactory';
import { ContactsRepositoryFactory } from '@domain/people/repositories/factories/ContactsRepositoryFactory';
import { IndividualRepositoryFactory } from '@domain/people/repositories/factories/IndividualRepositoryFactory';
import { TransactionsRepositoryFactory } from '@domain/people/repositories/factories/TransactionsRepositoryFactory';
import { UsersRepositoryFactory } from '@domain/people/repositories/factories/UsersRepositoryFactory';
import { MailProviderFactory } from '@shared/providers/mail/factories/MailProviderFactory';
import { MailProvider } from '@shared/providers/mail/implementations/MailProvider';
import { QrcodeProviderFactory } from '@shared/providers/qrcode/factories/QrcodeProviderFactory';
import { SpeakeasyProviderFactory } from '@shared/providers/speakeasy/factories/SpeakeasyProviderFactory';
import { CreateIndividualUseCaseFactory } from '../factories/CreateIndividualUseCaseFactory';

jest.mock('@domain/people/infra/typeorm/repositories/AddressesRepository');
jest.mock('@domain/people/infra/typeorm/repositories/ContactsRepository');
jest.mock('@domain/people/infra/typeorm/repositories/UserRepository');
jest.mock('@domain/people/infra/typeorm/repositories/IndividualRepository');
jest.mock('@domain/people/infra/typeorm/repositories/TransactionsRepository');
jest.mock('@shared/providers/mail/implementations/MailProvider.ts');

const factoryUseCase = () =>
  CreateIndividualUseCaseFactory(
    UsersRepositoryFactory(),
    ContactsRepositoryFactory(),
    AddressesRepositoryFactory(),
    IndividualRepositoryFactory(),
    SpeakeasyProviderFactory(),
    MailProviderFactory(),
    QrcodeProviderFactory(),
    TransactionsRepositoryFactory(),
  );

const mock = {
  user: {
    email: 'teste@teste.com',
    hashPassword: '123',
  },
  individual: {
    cpf: '000.000.000-00',
    name: 'Teste',
    birthDate: new Date('1993-10-29'),
    gender: 'Masculino',
  },
  address: {
    street: 'Rua A',
    neighborhood: 'Bairro',
    number: '400',
    complement: 'Apartamento',
    city: 'Cidade doida',
    state: 'BA',
    zipCode: '478000000',
  },
  contacts: [
    {
      info: '77999999999',
      type: 1,
    },
  ],
};

describe('CreateIndividualUseCase', () => {
  test('Should be able to create a individual', async () => {
    jest
      .spyOn(UserRepository.prototype, 'findByEmail')
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(UserRepository.prototype, 'store')
      .mockImplementationOnce((): any => {
        return { id: 1 };
      });

    jest
      .spyOn(TransactionsRepository.prototype, 'startTransactions')
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(TransactionsRepository.prototype, 'commitTransaction')
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(TransactionsRepository.prototype, 'rollback')
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(IndividualRepository.prototype, 'findByCpf')
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(IndividualRepository.prototype, 'store')
      .mockImplementationOnce((): any => {
        return { id: 1 };
      });

    jest
      .spyOn(AddressesRepository.prototype, 'store')
      .mockImplementationOnce((): any => {
        return { id: 1 };
      });

    jest
      .spyOn(ContactsRepository.prototype, 'store')
      .mockImplementationOnce((): any => {
        return { id: 1 };
      });

    const sut = factoryUseCase();
    await sut.execute(mock);
  });

  test('Should be able to create a individual feminino', async () => {
    jest
      .spyOn(UserRepository.prototype, 'findByEmail')
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(UserRepository.prototype, 'store')
      .mockImplementationOnce((): any => {
        return { id: 1 };
      });

    jest
      .spyOn(TransactionsRepository.prototype, 'startTransactions')
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(TransactionsRepository.prototype, 'commitTransaction')
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(TransactionsRepository.prototype, 'rollback')
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(IndividualRepository.prototype, 'findByCpf')
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(IndividualRepository.prototype, 'store')
      .mockImplementationOnce((): any => {
        return { id: 1 };
      });

    jest
      .spyOn(AddressesRepository.prototype, 'store')
      .mockImplementationOnce((): any => {
        return { id: 1 };
      });

    jest
      .spyOn(ContactsRepository.prototype, 'store')
      .mockImplementationOnce((): any => {
        return { id: 1 };
      });

    const sut = factoryUseCase();
    await sut.execute({
      user: {
        email: 'teste@teste.com',
        hashPassword: '123',
      },
      individual: {
        cpf: '000.000.000-00',
        name: 'Teste',
        birthDate: new Date('1993-10-29'),
        gender: 'Feminino',
      },
      address: {
        street: 'Rua A',
        neighborhood: 'Bairro',
        number: '400',
        complement: 'Apartamento',
        city: 'Cidade doida',
        state: 'BA',
        zipCode: '478000000',
      },
      contacts: [
        {
          info: '77999999999',
          type: 1,
        },
      ],
    });
  });

  test('Should not be able to create an individual with a registered email address.', async () => {
    jest
      .spyOn(UserRepository.prototype, 'findByEmail')
      .mockImplementationOnce((): any => ({ id: 1 }));

    jest
      .spyOn(MailProvider.prototype, 'send')
      .mockImplementationOnce((): any => {
        return null;
      });

    try {
      const sut = factoryUseCase();
      await sut.execute(mock);
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      expect(error.body).toEqual('"\\"User already exists\\""');
    }
  });

  test('Should not be able to create an individual', async () => {
    jest
      .spyOn(UserRepository.prototype, 'findByEmail')
      .mockImplementationOnce((): any => null);

    jest
      .spyOn(UserRepository.prototype, 'store')
      .mockImplementationOnce((): any => {
        return { id: 1 };
      });

    jest
      .spyOn(IndividualRepository.prototype, 'findByCpf')
      .mockImplementationOnce((): any => {
        return { cpf: '00000000001' };
      });

    try {
      const sut = factoryUseCase();
      await sut.execute({
        user: {
          email: 'teste@teste.com',
          hashPassword: '123',
        },
        individual: {
          cpf: '000.000.000-00',
          name: 'Teste',
          birthDate: new Date('1993-10-29'),
          gender: 'Masculino',
        },
        address: {
          street: 'Rua A',
          neighborhood: 'Bairro',
          number: '400',
          complement: 'Apartamento',
          city: 'Cidade doida',
          state: 'BA',
          zipCode: '478000000',
        },
        contacts: [
          {
            info: '77999999999',
            type: 1,
          },
        ],
      });
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      expect(error.body).toEqual('"\\"Individual already exists\\""');
    }
  });

  test('Should not be able to create an individual gender validaded', async () => {
    jest
      .spyOn(UserRepository.prototype, 'findByEmail')
      .mockImplementationOnce((): any => null);

    jest
      .spyOn(UserRepository.prototype, 'store')
      .mockImplementationOnce((): any => {
        return { id: 1 };
      });

    jest
      .spyOn(IndividualRepository.prototype, 'findByCpf')
      .mockImplementationOnce((): any => {
        return null;
      });

    try {
      const sut = factoryUseCase();
      await sut.execute({
        user: {
          email: 'teste@teste.com',
          hashPassword: '123',
        },
        individual: {
          cpf: '000.000.000-00',
          name: 'Teste',
          birthDate: new Date('1993-10-29'),
          gender: 'noGender',
        },
        address: {
          street: 'Rua A',
          neighborhood: 'Bairro',
          number: '400',
          complement: 'Apartamento',
          city: 'Cidade doida',
          state: 'BA',
          zipCode: '478000000',
        },
        contacts: [
          {
            info: '77999999999',
            type: 1,
          },
        ],
      });
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      expect(error.body).toEqual('"\\"gender not found\\""');
    }
  });
});
