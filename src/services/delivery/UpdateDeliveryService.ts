import { getCustomRepository } from 'typeorm';

import RecipientsRepository from '../../repositories/RecipientsRepository';
import DeliverymenRepository from '../../repositories/DeliverymenRepository';
import DeliveriesRepository from '../../repositories/DeliveriesRepository';

import Delivery from '../../models/Delivery';

import AppError from '../../errors/AppError';

interface Request {
  delivery_id: string;
  product: string;
  recipient_id: string;
  deliveryman_id: string;
}

class UpdateDeliveryService {
  public async execute({
    delivery_id,
    product,
    recipient_id,
    deliveryman_id,
  }: Request): Promise<Delivery> {
    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const deliveryExists = await deliveriesRepository.findById(delivery_id);

    if (!deliveryExists) {
      throw new AppError('Encomenda não encontrada.', 404);
    }

    const recipientsRepository = getCustomRepository(RecipientsRepository);

    const recipientExists = await recipientsRepository.findById(recipient_id);

    if (!recipientExists) {
      throw new AppError('Destinatário não encontrado.', 404);
    }

    const deliverymenRepository = getCustomRepository(DeliverymenRepository);

    const deliveryManExists = await deliverymenRepository.findById(
      deliveryman_id,
    );

    if (!deliveryManExists) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    const updatedDelivery = await deliveriesRepository.save({
      id: delivery_id,
      product,
      recipient_id,
      deliveryman_id,
    });

    return updatedDelivery;
  }
}

export default UpdateDeliveryService;
