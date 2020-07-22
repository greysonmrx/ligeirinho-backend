import { getCustomRepository } from 'typeorm';

import DeliverymenRepository from '../../repositories/DeliverymenRepository';

import DeliveryMan from '../../models/DeliveryMan';

class ListDeliverymenService {
  public async execute(): Promise<DeliveryMan[]> {
    const deliverymenRepository = getCustomRepository(DeliverymenRepository);

    const deliverymen = await deliverymenRepository.find({
      relations: ['avatar'],
    });

    return deliverymen;
  }
}

export default ListDeliverymenService;
