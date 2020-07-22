import { getCustomRepository } from 'typeorm';

import ProblemsRepository from '../../repositories/ProblemsRepository';

import Problem from '../../models/Problem';

class ListProblemService {
  public async execute(): Promise<Problem[]> {
    const problemsRepository = getCustomRepository(ProblemsRepository);

    const problems = await problemsRepository.find({
      relations: [
        'delivery',
        'delivery.recipient',
        'delivery.deliveryman',
        'delivery.signature',
      ],
    });

    return problems;
  }
}

export default ListProblemService;
