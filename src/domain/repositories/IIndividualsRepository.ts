import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { ICreateIndividual } from '../types/ICreateIndividual';
import { Individual } from '../infra/entities/Individual';

interface IIndividualsRepository {
  store(
    data: ICreateIndividual,
    queryRunner?: QueryRunner,
  ): Promise<Individual>;
  findByCpf(cpf: string): Promise<Individual>;
  findByUserId(userId: number): Promise<Individual>;
  findById(individualId: number): Promise<Individual>;
}

export { IIndividualsRepository };
