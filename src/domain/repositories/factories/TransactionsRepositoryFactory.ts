import { TransactionsRepository } from '@domain/infra/repositories/TransactionsRepository';
import { ITransactionsRepository } from '../ITransactionsRepository';

function TransactionsRepositoryFactory(): ITransactionsRepository {
  return new TransactionsRepository();
}

export { TransactionsRepositoryFactory };
