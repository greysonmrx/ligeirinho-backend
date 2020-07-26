import { getCustomRepository } from 'typeorm';

import DeliveriesRepository from '../../repositories/DeliveriesRepository';

import Delivery from '../../models/Delivery';

import AppError from '../../errors/AppError';

class ListDeliveryService {
  public async execute(delivery_id: string): Promise<Delivery> {
    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const delivery = await deliveriesRepository.findOne({
      where: { id: delivery_id },
      relations: [
        'recipient',
        'deliveryman',
        'deliveryman.avatar',
        'signature',
      ],
    });

    if (!delivery) {
      throw new AppError('Encomenda não encontrada.', 404);
    }

    return delivery;
  }
}

export default ListDeliveryService;
