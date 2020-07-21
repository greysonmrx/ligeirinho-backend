import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Delivery from '../models/Delivery';
import RecipientRepository from '../repositories/RecipientRepository';
import DeliverymanRepository from '../repositories/DeliverymanRepository';
import DeliveriesRepository from '../repositories/DeliveriesRepository';

interface Request {
  id: string;
  product: string;
  recipient_id: string;
  deliveryman_id: string;
}

class UpdateDeliveryService {
  public async execute({
    id,
    product,
    recipient_id,
    deliveryman_id,
  }: Request): Promise<Delivery> {
    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const delivery = await deliveriesRepository.findById(id);

    if (!delivery) {
      throw new AppError('Entrega não encontrada.', 404);
    }

    const recipientRepository = getCustomRepository(RecipientRepository);

    const recipientExists = await recipientRepository.findById(recipient_id);

    if (!recipientExists) {
      throw new AppError('Destinatário não encontrado.', 404);
    }

    const deliverymanRepository = getCustomRepository(DeliverymanRepository);

    const deliverymanExists = await deliverymanRepository.findById(
      deliveryman_id,
    );

    if (!deliverymanExists) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    const updatedDelivery = await deliveriesRepository.save({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });

    return updatedDelivery;
  }
}

export default UpdateDeliveryService;
