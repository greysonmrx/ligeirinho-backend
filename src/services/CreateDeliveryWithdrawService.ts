import { getCustomRepository } from 'typeorm';
import { parseISO, isBefore, isAfter, setHours } from 'date-fns';

import DeliverymanRepository from '../repositories/DeliverymanRepository';
import AppError from '../errors/AppError';
import DeliveriesRepository from '../repositories/DeliveriesRepository';

interface Request {
  deliveryman_id: string;
  delivery_id: string;
  start_date: string;
}

class CreateDeliveryWithdrawService {
  public async execute({
    deliveryman_id,
    delivery_id,
    start_date,
  }: Request): Promise<void> {
    const deliverymanRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymanRepository.findById(deliveryman_id);

    if (!deliveryman) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const delivery = await deliveriesRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Entrega não encontrada.', 404);
    }

    if (delivery.status === 'RETIRADA') {
      throw new AppError('Esta entrega já foi retirada.');
    }

    const [, count] = await deliveriesRepository.findAndCount({
      where: {
        deliveryman_id,
        start_date: null,
        signature_id: null,
      },
    });

    if (count >= 5) {
      throw new AppError('Número máximo de retiradas atingido.', 401);
    }

    const start_date_ISO = parseISO(start_date);

    if (
      isBefore(start_date_ISO, setHours(new Date(), 8)) ||
      isAfter(start_date_ISO, setHours(new Date(), 18))
    ) {
      throw new AppError(
        'Retiradas só podem ser feitas entre as 08:00 e 18:00h',
        401,
      );
    }

    await deliveriesRepository.save({ ...delivery, status: 'RETIRADA' });
  }
}

export default CreateDeliveryWithdrawService;
