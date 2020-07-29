import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import DeliverymenRepository from '../../repositories/DeliverymenRepository';

import DeliveryMan from '../../models/DeliveryMan';

import AppError from '../../errors/AppError';

class ListDeliveryManService {
  public async execute(deliveryman_id: string): Promise<DeliveryMan> {
    const deliverymenRepository = getCustomRepository(DeliverymenRepository);

    const deliveryMan = await deliverymenRepository.findOne({
      where: { id: deliveryman_id },
      relations: ['avatar'],
    });

    if (!deliveryMan) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    return classToClass(deliveryMan);
  }
}

export default ListDeliveryManService;
