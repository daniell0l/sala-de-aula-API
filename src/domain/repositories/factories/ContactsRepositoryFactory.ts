import { ContactsRepository } from '../../infra/repositories/ContactsRepository';
import { IContactsRepository } from '../IContactsRepository';

function ContactsRepositoryFactory(): IContactsRepository {
  return new ContactsRepository();
}

export { ContactsRepositoryFactory };
