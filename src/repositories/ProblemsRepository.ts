import { EntityRepository, Repository } from 'typeorm';

import Problem from '../models/Problem';

@EntityRepository(Problem)
class ProblemsRepository extends Repository<Problem> {
  public async findById(problem_id: string): Promise<Problem | undefined> {
    const findProblem = await this.findOne({ where: { id: problem_id } });

    return findProblem;
  }
}

export default ProblemsRepository;
