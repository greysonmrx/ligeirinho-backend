import { getCustomRepository, Not } from 'typeorm';

import AppError from '../errors/AppError';
import Delivery from '../models/Delivery';
import DeliveriesRepository from '../repositories/DeliveriesRepository';
import DeliverymanRepository from '../repositories/DeliverymanRepository';

class ListDeliveryDeliveredService {
  public async execute(id: string): Promise<Delivery[]> {
    const deliverymanRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymanRepository.findById(id);

    if (!deliveryman) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const deliveries = await deliveriesRepository.find({
      where: { deliveryman_id: id, signature_id: Not(null) },
      relations: ['recipient', 'deliveryman', 'signature'],
    });

    return deliveries;
  }
}

export default ListDeliveryDeliveredService;
