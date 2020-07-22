import { getCustomRepository } from 'typeorm';

import DeliverymenRepository from '../../repositories/DeliverymenRepository';

import DeliveryMan from '../../models/DeliveryMan';

import AppError from '../../errors/AppError';

interface Request {
  name: string;
  email: string;
  avatar_id?: string;
}

class CreateDeliveryManService {
  public async execute({
    name,
    email,
    avatar_id,
  }: Request): Promise<DeliveryMan> {
    const deliverymenRepository = getCustomRepository(DeliverymenRepository);

    const deliveryManExistsWithEmail = await deliverymenRepository.findByEmail(
      email,
    );

    if (deliveryManExistsWithEmail) {
      throw new AppError(
        'Este endereço de e-mail já está em uso. Tente outro.',
      );
    }

    const deliveryMan = await deliverymenRepository.create({
      name,
      email,
      avatar_id,
    });

    await deliverymenRepository.save(deliveryMan);

    return deliveryMan;
  }
}

export default CreateDeliveryManService;
