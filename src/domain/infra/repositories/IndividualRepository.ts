import { ICreateIndividual } from '@domain/types/ICreateIndividual';
import { DBManager } from '@shared/db';
import { EntityRepository, Repository } from 'typeorm';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { IIndividualsRepository } from '@domain/repositories/IIndividualsRepository';
import { Individual } from '../entities/Individual';

@EntityRepository(Individual)
class IndividualRepository
  extends Repository<Individual>
  implements IIndividualsRepository
{
  async findById(individualId: number): Promise<Individual> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(IndividualRepository);

    const individual = await repository.findOne(individualId);

    return individual;
  }

  async findByUserId(userId: number): Promise<Individual> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(IndividualRepository);

    const individual = await repository.findOne({
      where: { userId },
    });

    return individual;
  }

  async findByCpf(cpf: string): Promise<Individual> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(IndividualRepository);
    const individual = await repository.findOne({ cpf });

    return individual;
  }

  async store(
    data: ICreateIndividual,
    queryRunner?: QueryRunner,
  ): Promise<Individual> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(IndividualRepository);

    const individual = repository.create(data);

    if (!queryRunner) {
      await repository.save(individual);
      return individual;
    }

    await queryRunner.manager.save(individual);
    return individual;
  }
}
export { IndividualRepository };
