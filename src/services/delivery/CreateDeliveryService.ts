import { getCustomRepository } from 'typeorm';

import RecipientsRepository from '../../repositories/RecipientsRepository';
import DeliverymenRepository from '../../repositories/DeliverymenRepository';
import DeliveriesRepository from '../../repositories/DeliveriesRepository';

import Delivery from '../../models/Delivery';

import AppError from '../../errors/AppError';

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
