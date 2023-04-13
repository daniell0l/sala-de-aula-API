import { ICreateContact } from '@domain/types/ICreateContact';
import { IContactsRepository } from '@domain/repositories/IContactsRepository';
import { DBManager } from '@shared/db';
import { EntityRepository, Repository } from 'typeorm';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { Contact } from '../entities/Contact';

@EntityRepository(Contact)
class ContactsRepository
  extends Repository<Contact>
  implements IContactsRepository
{
  async list(params: any): Promise<Contact[]> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(ContactsRepository);
    const contacts = repository.find({ where: { params } });
    return contacts;
  }

  async deleteById(id: number): Promise<void> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(ContactsRepository);
    await repository.delete(id);
  }

  async findByIndividualId(individualId: number): Promise<Contact[]> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(ContactsRepository);
    const contacts = await repository.find({ individualId });
    return contacts;
  }

  async store(
    data: ICreateContact,
    queryRunner?: QueryRunner,
  ): Promise<Contact> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(ContactsRepository);

    const contact = repository.create(data);

    if (!queryRunner) {
      await repository.save(contact);
      return contact;
    }

    await queryRunner.manager.save(contact);

    return contact;
  }
}
export { ContactsRepository };
