import { getCustomRepository } from 'typeorm';

import ProblemsRepository from '../../repositories/ProblemsRepository';
import DeliveriesRepository from '../../repositories/DeliveriesRepository';

import AppError from '../../errors/AppError';

class CancelDeliveryService {
  public async execute(problem_id: string): Promise<void> {
    const problemsRepository = getCustomRepository(ProblemsRepository);

    const problem = await problemsRepository.findById(problem_id);

    if (!problem) {
      throw new AppError('Problema da encomenda não encontrado.', 404);
    }

    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const delivery = await deliveriesRepository.findById(problem.delivery_id);

    if (!delivery) {
      throw new AppError('Encomenda não encontrada.', 404);
    }

    await deliveriesRepository.save({
      ...delivery,
      status: 'CANCELADA',
      canceled_at: new Date(),
    });
  }
}

export default CancelDeliveryService;
