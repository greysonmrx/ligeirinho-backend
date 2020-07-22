import { Request, Response } from 'express';

import FinishDeliveryService from '../../services/delivery/FinishDeliveryService';

class DeliveryFinishController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { deliveryman_id, delivery_id } = request.params;
    const { signature_id } = request.body;

    const finishDelivery = new FinishDeliveryService();

    await finishDelivery.execute({
      deliveryman_id,
      delivery_id,
      signature_id,
    });

    return response.status(204).json();
  }
}

export default DeliveryFinishController;
