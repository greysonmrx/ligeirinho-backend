import { Request, Response } from 'express';

import CreateDeliveryFinishService from '../services/CreateDeliveryFinishService';

class DeliveryFinishController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { deliveryman_id, delivery_id } = request.params;
    const { signature_id } = request.body;

    const createDeliveryFinish = new CreateDeliveryFinishService();

    await createDeliveryFinish.execute({
      deliveryman_id,
      delivery_id,
      signature_id,
    });

    return response.status(204).json();
  }
}

export default DeliveryFinishController;
