import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

interface ITransactionsRepository {
  startTransactions(): Promise<QueryRunner>;
  commitTransaction(queryRunner: QueryRunner): Promise<void>;
  rollback(queryRunner: QueryRunner): Promise<void>;
}

export { ITransactionsRepository };
