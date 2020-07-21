import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import DeliverymanRepository from '../repositories/DeliverymanRepository';
import Deliveryman from '../models/Deliveryman';

interface Request {
  id: string;
  name: string;
  email: string;
  avatar_id?: string;
}

class UpdateDeliverymanService {
  public async execute({
    id,
    name,
    email,
    avatar_id,
  }: Request): Promise<Deliveryman> {
    const deliverymanRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymanRepository.findById(id);

    if (!deliveryman) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    const deliverymanExistsWithEmail = await deliverymanRepository.findByEmail(
      email,
    );

    if (deliverymanExistsWithEmail && deliverymanExistsWithEmail.id !== id) {
      throw new AppError(
        'Este endereço de e-mail já está em uso. Tente outro.',
      );
    }

    const updatedDeliveryman = await deliverymanRepository.save({
      id,
      name,
      email,
      avatar_id,
    });

    return updatedDeliveryman;
  }
}

export default UpdateDeliverymanService;
