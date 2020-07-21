import { getCustomRepository } from 'typeorm';

import Deliveryman from '../models/Deliveryman';
import DeliverymanRepository from '../repositories/DeliverymanRepository';

class ListDeliverymanService {
  public async execute(): Promise<Deliveryman[]> {
    const deliverymanRepository = getCustomRepository(DeliverymanRepository);

    const response = await deliverymanRepository.find({
      relations: ['avatar'],
    });

    return response;
  }
}

export default ListDeliverymanService;
