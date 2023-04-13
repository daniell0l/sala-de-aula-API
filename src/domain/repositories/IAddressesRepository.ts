import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { ICreateAddress } from '../types/ICreateAddress';
import { Address } from '../infra/entities/Addresses';

interface IAddressesRepository {
  store(data: ICreateAddress, queryRunner?: QueryRunner): Promise<Address>;
  updateById(id: number, data: ICreateAddress): Promise<Address>;
  deleteById(id: number): Promise<void>;
  findByIndividualId(individualId: number): Promise<Address>;
}

export { IAddressesRepository };
