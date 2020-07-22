import { getCustomRepository } from 'typeorm';

import DeliveriesRepository from '../../repositories/DeliveriesRepository';
import ProblemsRepository from '../../repositories/ProblemsRepository';

import Problem from '../../models/Problem';

import AppError from '../../errors/AppError';

interface Request {
  delivery_id: string;
  description: string;
}

class CreateProblemService {
  public async execute({
    delivery_id,
    description,
  }: Request): Promise<Problem> {
    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const deliveryExists = await deliveriesRepository.findById(delivery_id);

    if (!deliveryExists) {
      throw new AppError('Encomenda não encontrada.', 404);
    }

    const problemsRepository = getCustomRepository(ProblemsRepository);

    const problem = await problemsRepository.create({
      delivery_id,
      description,
    });

    await problemsRepository.save(problem);

    return problem;
  }
}

export default CreateProblemService;
