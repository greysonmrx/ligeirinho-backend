import { getCustomRepository } from 'typeorm';

import DeliveriesRepository from '../repositories/DeliveriesRepository';
import AppError from '../errors/AppError';

class DeleteDeliveryService {
  public async execute(id: string): Promise<void> {
    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const delivery = await deliveriesRepository.findById(id);

    if (!delivery) {
      throw new AppError('Entrega não encontrada.', 404);
    }

    if (delivery.start_date) {
      throw new AppError('Esta entrega já foi enviada.');
    }

    await deliveriesRepository.delete(id);
  }
}

export default DeleteDeliveryService;
