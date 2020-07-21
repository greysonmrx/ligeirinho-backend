import { getCustomRepository } from 'typeorm';

import Delivery from '../models/Delivery';
import DeliveriesRepository from '../repositories/DeliveriesRepository';

class ListDeliveryService {
  public async execute(): Promise<Delivery[]> {
    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const deliveries = await deliveriesRepository.find({
      relations: ['recipient', 'deliveryman', 'signature'],
    });

    return deliveries;
  }
}

export default ListDeliveryService;
