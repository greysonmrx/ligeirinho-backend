import { getCustomRepository } from 'typeorm';

import DeliverymanRepository from '../repositories/DeliverymanRepository';
import AppError from '../errors/AppError';

class DeleteDeliverymanService {
  public async execute(id: string): Promise<void> {
    const deliverymanRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymanRepository.findById(id);

    if (!deliveryman) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    await deliverymanRepository.delete(id);
  }
}

export default DeleteDeliverymanService;
