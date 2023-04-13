import { ICreateUser } from 'src/domain/types/ICreateUser';
import { DBManager } from '@shared/db';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { EntityRepository, Repository } from 'typeorm';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { User } from '../entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUsersRepository {
  async updatePasswordById(id: number, newHashPassword: string): Promise<void> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(UserRepository);

    const data: ICreateUser = {
      hashPassword: newHashPassword,
    };

    await repository.update(id, data);
  }

  async updateEmailById(id: number, newEmail: string): Promise<void> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(UserRepository);

    const user = {
      email: newEmail,
    };

    await repository.update(id, user);
  }

  async findById(id: number): Promise<User> {
    const connection = await DBManager.getConnection();

    const repository = connection.getCustomRepository(UserRepository);

    const user = await repository.findOne(id);

    return user;
  }

  async store(data: ICreateUser, queryRunner?: QueryRunner): Promise<User> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(UserRepository);

    const user = repository.create(data);

    if (!queryRunner) {
      await repository.save(user);
      return user;
    }

    await queryRunner.manager.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(UserRepository);

    const user = repository.findOne({ email });

    return user;
  }
}
export { UserRepository };
