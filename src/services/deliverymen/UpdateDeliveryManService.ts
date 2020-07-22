import { getCustomRepository } from 'typeorm';

import DeliverymenRepository from '../../repositories/DeliverymenRepository';

import DeliveryMan from '../../models/DeliveryMan';

import AppError from '../../errors/AppError';

interface Request {
  deliveryman_id: string;
  name: string;
  email: string;
  avatar_id?: string;
}

class UpdateDeliverymanService {
  public async execute({
    deliveryman_id,
    name,
    email,
    avatar_id,
  }: Request): Promise<DeliveryMan> {
    const deliverymenRepository = getCustomRepository(DeliverymenRepository);

    const deliveryManExists = await deliverymenRepository.findById(
      deliveryman_id,
    );

    if (!deliveryManExists) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    const deliveryManExistsWithEmail = await deliverymenRepository.findByEmail(
      email,
    );

    if (
      deliveryManExistsWithEmail &&
      deliveryManExistsWithEmail.id !== deliveryman_id
    ) {
      throw new AppError(
        'Este endereço de e-mail já está em uso. Tente outro.',
      );
    }

    const updatedDeliveryMan = await deliverymenRepository.save({
      id: deliveryman_id,
      name,
      email,
      avatar_id,
    });

    return updatedDeliveryMan;
  }
}

export default UpdateDeliverymanService;
