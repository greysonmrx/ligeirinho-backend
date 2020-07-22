import { getCustomRepository } from 'typeorm';

import DeliverymenRepository from '../../repositories/DeliverymenRepository';

import AppError from '../../errors/AppError';

class DeleteDeliveryManService {
  public async execute(deliveryman_id: string): Promise<void> {
    const deliverymenRepository = getCustomRepository(DeliverymenRepository);

    const deliveryManExists = await deliverymenRepository.findById(
      deliveryman_id,
    );

    if (!deliveryManExists) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    await deliverymenRepository.delete(deliveryman_id);
  }
}

export default DeleteDeliveryManService;
