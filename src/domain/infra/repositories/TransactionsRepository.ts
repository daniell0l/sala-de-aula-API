import { ITransactionsRepository } from '@domain/repositories/ITransactionsRepository';
import { DBManager } from '@shared/db';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

class TransactionsRepository implements ITransactionsRepository {
  async startTransactions(): Promise<QueryRunner> {
    const connection = await DBManager.getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    return queryRunner;
  }

  async commitTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
  }

  async rollback(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }
}

export { TransactionsRepository };
