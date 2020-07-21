import { getCustomRepository, Not, IsNull } from 'typeorm';

import DeliverymanRepository from '../repositories/DeliverymanRepository';
import DeliveriesRepository from '../repositories/DeliveriesRepository';
import FilesRepository from '../repositories/FilesRepository';
import AppError from '../errors/AppError';

interface Request {
  deliveryman_id: string;
  delivery_id: string;
  signature_id: string;
}

class CreateDeliveryFinishService {
  public async execute({
    deliveryman_id,
    delivery_id,
    signature_id,
  }: Request): Promise<void> {
    const deliverymanRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymanRepository.findById(deliveryman_id);

    if (!deliveryman) {
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
      throw new AppError('Entrega não encontrada.', 404);
    }

    if (delivery.status === 'ENTREGUE') {
      throw new AppError('Esta entrega já foi entregue.');
    }

    const filesRepository = getCustomRepository(FilesRepository);

    const signatureImage = await filesRepository.findById(signature_id);

    if (!signatureImage) {
      throw new AppError('Imagem da assinatura não encontrada.', 404);
    }

    await deliveriesRepository.save({
      ...delivery,
      signature_id,
      status: 'ENTREGUE',
    });
  }
}

export default CreateDeliveryFinishService;
