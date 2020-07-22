import { getCustomRepository } from 'typeorm';

import ProblemsRepository from '../../repositories/ProblemsRepository';
import DeliveriesRepository from '../../repositories/DeliveriesRepository';

import Problem from '../../models/Problem';

import AppError from '../../errors/AppError';

class ListDeliveryProblemsService {
  public async execute(delivery_id: string): Promise<Problem[]> {
    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const deliveryExists = await deliveriesRepository.findById(delivery_id);

    if (!deliveryExists) {
      throw new AppError('Encomenda não encontrada.', 404);
    }

    const problemsRepository = getCustomRepository(ProblemsRepository);

    const deliveryProblems = await problemsRepository.find({
      where: {
        delivery_id,
      },
      relations: [
        'delivery',
        'delivery.recipient',
        'delivery.deliveryman',
        'delivery.signature',
      ],
    });

    return deliveryProblems;
  }
}

export default ListDeliveryProblemsService;
