import { Request, Response } from 'express';

import CreateDeliverymanService from '../services/CreateDeliverymanService';
import ListDeliverymanService from '../services/ListDeliverymanService';

class DeliverymanController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDelivery = new ListDeliverymanService();

    const all = await listDelivery.execute();

    return response.status(200).json(all);
  }

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
