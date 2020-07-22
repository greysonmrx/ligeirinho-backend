import { getCustomRepository } from 'typeorm';

import DeliveriesRepository from '../../repositories/DeliveriesRepository';

import Delivery from '../../models/Delivery';

class ListDeliveriesService {
  public async execute(): Promise<Delivery[]> {
    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const deliveries = await deliveriesRepository.find({
      relations: ['recipient', 'deliveryman', 'signature'],
    });

    return deliveries;
  }
}

export default ListDeliveriesService;
