import { ICreateAddress } from '@domain/types/ICreateAddress';
import { DBManager } from '@shared/db';

import { EntityRepository, Repository } from 'typeorm';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { IAddressesRepository } from '../../repositories/IAddressesRepository';

import { Address } from '../entities/Addresses';

@EntityRepository(Address)
class AddressesRepository
  extends Repository<Address>
  implements IAddressesRepository
{
  async deleteById(peopleId: number): Promise<void> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(AddressesRepository);
    await repository.delete(peopleId);
  }

  async store(
    data: ICreateAddress,
    queryRunner?: QueryRunner,
  ): Promise<Address> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(AddressesRepository);

    const address = repository.create(data);

    if (!queryRunner) {
      await repository.save(address);
      return address;
    }

    await queryRunner.manager.save(address);

    return address;
  }

  async updateById(id: number, data: ICreateAddress): Promise<Address> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(AddressesRepository);
    await repository.update(id, data);
    const address = await repository.findOne(id);
    return address;
  }

  async findByIndividualId(individualId: number): Promise<Address> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(AddressesRepository);
    const address = await repository.findOne({ individualId });

    return address;
  }
}
export { AddressesRepository };
