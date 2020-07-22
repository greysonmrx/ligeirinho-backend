import { getCustomRepository, Between } from 'typeorm';
import { startOfDay, endOfDay } from 'date-fns';

import DeliverymenRepository from '../../repositories/DeliverymenRepository';
import DeliveriesRepository from '../../repositories/DeliveriesRepository';

import AppError from '../../errors/AppError';

import checkDate from '../../utils/checkDate';

interface Request {
  deliveryman_id: string;
  delivery_id: string;
}

class WithdrawDeliveryService {
  public async execute({
    deliveryman_id,
    delivery_id,
  }: Request): Promise<void> {
    const deliverymenRepository = getCustomRepository(DeliverymenRepository);

    const deliveryManExists = await deliverymenRepository.findById(
      deliveryman_id,
    );

    if (!deliveryManExists) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const delivery = await deliveriesRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Encomenda não encontrada.', 404);
    }

    if (delivery.status === 'RETIRADA') {
      throw new AppError('Esta encomenda já foi retirada.');
    }

    const start_date = new Date();

    const [, count] = await deliveriesRepository.findAndCount({
      where: {
        deliveryman_id,
        start_date: Between(startOfDay(start_date), endOfDay(start_date)),
      },
    });

    if (count >= 5) {
      throw new AppError(
        'Número máximo de encomendas retiradas por hoje atingido.',
        401,
      );
    }

    if (!checkDate(start_date)) {
      throw new AppError(
        'Encomendas só podem ser retiradas entre as 08:00 e 18:00h',
        401,
      );
    }

    await deliveriesRepository.save({
      ...delivery,
      start_date,
      status: 'RETIRADA',
    });
  }
}

export default WithdrawDeliveryService;
