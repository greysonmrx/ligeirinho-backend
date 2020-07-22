import { getCustomRepository } from 'typeorm';

import DeliveriesRepository from '../../repositories/DeliveriesRepository';

import AppError from '../../errors/AppError';

class DeleteDeliveryService {
  public async execute(delivery_id: string): Promise<void> {
    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const delivery = await deliveriesRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Encomenda não encontrada.', 404);
    }

    if (delivery.start_date) {
      throw new AppError('Esta encomenda já foi enviada.');
    }

    await deliveriesRepository.delete(delivery_id);
  }
}

export default DeleteDeliveryService;
