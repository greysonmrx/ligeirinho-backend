import { getCustomRepository } from 'typeorm';

import Delivery from '../models/Delivery';
import RecipientRepository from '../repositories/RecipientRepository';
import AppError from '../errors/AppError';
import DeliverymanRepository from '../repositories/DeliverymanRepository';
import DeliveriesRepository from '../repositories/DeliveriesRepository';

interface Request {
  product: string;
  recipient_id: string;
  deliveryman_id: string;
}

class CreateDeliveryService {
  public async execute({
    product,
    recipient_id,
    deliveryman_id,
  }: Request): Promise<Delivery> {
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

    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const delivery = await deliveriesRepository.create({
      product,
      recipient_id,
      deliveryman_id,
      status: 'PENDENTE',
    });

    await deliveriesRepository.save(delivery);

    return delivery;
  }
}

export default CreateDeliveryService;
