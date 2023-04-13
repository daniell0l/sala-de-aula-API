import { UserRepository } from '../../infra/repositories/UserRepository';
import { IUsersRepository } from '../IUsersRepository';

function UsersRepositoryFactory(): IUsersRepository {
  return new UserRepository();
}

export { UsersRepositoryFactory };
