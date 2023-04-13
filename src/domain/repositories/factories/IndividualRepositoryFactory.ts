import { IndividualRepository } from '../../infra/repositories/IndividualRepository';
import { IIndividualsRepository } from '../IIndividualsRepository';

function IndividualRepositoryFactory(): IIndividualsRepository {
  return new IndividualRepository();
}

export { IndividualRepositoryFactory };
