import { getCustomRepository } from 'typeorm';

import DeliverymenRepository from '../../repositories/DeliverymenRepository';

import DeliveryMan from '../../models/DeliveryMan';

import AppError from '../../errors/AppError';

class ListDeliveryManService {
  public async execute(deliveryman_id: string): Promise<DeliveryMan> {
    const deliverymenRepository = getCustomRepository(DeliverymenRepository);

    const deliveryMan = await deliverymenRepository.findById(deliveryman_id);

    if (!deliveryMan) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    return deliveryMan;
  }
}

export default ListDeliveryManService;
