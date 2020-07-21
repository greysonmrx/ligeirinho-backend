import { Request, Response } from 'express';

import CreateDeliveryService from '../services/CreateDeliveryService';

class DeliveriesController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { product, recipient_id, deliveryman_id } = request.body;

    const createDeliveries = new CreateDeliveryService();

    const delivery = await createDeliveries.execute({
      product,
      recipient_id,
      deliveryman_id,
    });

    return response.status(201).json(delivery);
  }
}

export default DeliveriesController;
