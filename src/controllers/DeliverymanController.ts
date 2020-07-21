import { Request, Response } from 'express';

import CreateDeliverymanService from '../services/CreateDeliverymanService';

class DeliverymanController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, avatar_id } = request.body;

    const createDeliveryman = new CreateDeliverymanService();

    const deliveryman = await createDeliveryman.execute({
      name,
      email,
      avatar_id,
    });

    return response.status(201).json(deliveryman);
  }
}

export default DeliverymanController;
