import { getCustomRepository, Not, IsNull } from 'typeorm';

import DeliverymenRepository from '../../repositories/DeliverymenRepository';
import DeliveriesRepository from '../../repositories/DeliveriesRepository';
import FilesRepository from '../../repositories/FilesRepository';

import AppError from '../../errors/AppError';

interface Request {
  deliveryman_id: string;
  delivery_id: string;
  signature_id: string;
}

class FinishDeliveryService {
  public async execute({
    deliveryman_id,
    delivery_id,
    signature_id,
  }: Request): Promise<void> {
    const deliverymenRepository = getCustomRepository(DeliverymenRepository);

    const deliveryManExists = await deliverymenRepository.findById(
      deliveryman_id,
    );

    if (!deliveryManExists) {
      throw new AppError('Entregador não encontrado.', 404);
    }

    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const delivery = await deliveriesRepository.findOne({
      where: {
        id: delivery_id,
        start_date: Not(IsNull()),
        signature_id: null,
      },
    });

    if (!delivery) {
      throw new AppError('Encomenda não encontrada.', 404);
    }

    if (delivery.status === 'ENTREGUE') {
      throw new AppError('Esta encomenda já foi entregue.', 401);
    }

    const filesRepository = getCustomRepository(FilesRepository);

    const signatureExists = await filesRepository.findById(signature_id);

    if (!signatureExists) {
      throw new AppError('Imagem da assinatura não encontrada.', 404);
    }

    await deliveriesRepository.save({
      ...delivery,
      signature_id,
      status: 'ENTREGUE',
      end_date: new Date(),
    });
  }
}

export default FinishDeliveryService;
