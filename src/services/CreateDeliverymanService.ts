import { getCustomRepository } from 'typeorm';

import DeliverymanRepository from '../repositories/DeliverymanRepository';
import AppError from '../errors/AppError';
import Deliveryman from '../models/Deliveryman';

interface Request {
  name: string;
  email: string;
  avatar_id?: string;
}

class CreateDeliverymanService {
  public async execute({
    name,
    email,
    avatar_id,
  }: Request): Promise<Deliveryman> {
    const deliverymanRepository = getCustomRepository(DeliverymanRepository);

    const deliverymanExistsWithEmail = await deliverymanRepository.findByEmail(
      email,
    );

    if (deliverymanExistsWithEmail) {
      throw new AppError(
        'Este endereço de e-mail já está em uso. Tente outro.',
      );
    }

    const deliveryman = await deliverymanRepository.create({
      name,
      email,
      avatar_id,
    });

    await deliverymanRepository.save(deliveryman);

    return deliveryman;
  }
}

export default CreateDeliverymanService;
