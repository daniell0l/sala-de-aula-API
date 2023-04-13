import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { ICreateContact } from '../types/ICreateContact';
import { Contact } from '../infra/entities/Contact';

interface IContactsRepository {
  store(data: ICreateContact, queryRunner?: QueryRunner): Promise<Contact>;
  deleteById(id: number): Promise<void>;
  list(params: number): Promise<Contact[]>;
  findByIndividualId(individualId: number): Promise<Contact[]>;
}

export { IContactsRepository };
