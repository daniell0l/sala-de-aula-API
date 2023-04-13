import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { User } from '@domain/infra/entities/User';
import { ICreateUser } from '../types/ICreateUser';

interface IUsersRepository {
  store(data: ICreateUser, queryRunner?: QueryRunner): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: number): Promise<User>;
  updatePasswordById(id: number, newPassword: string): Promise<void>;
  updateEmailById(id: number, email: string): Promise<void>;
}

export { IUsersRepository };
