import { Request, Response } from 'express';

import UpdateDeliverymanService from '../services/UpdateDeliverymanService';
import DeleteDeliverymanService from '../services/DeleteDeliverymanService';
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

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, avatar_id } = request.body;
    const { id } = request.params;

    const updateDeliveryman = new UpdateDeliverymanService();

    const deliveryman = await updateDeliveryman.execute({
      id,
      name,
      email,
      avatar_id,
    });

    return response.status(200).json(deliveryman);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteDeliveryman = new DeleteDeliverymanService();

    await deleteDeliveryman.execute(id);

    return response.status(204).json();
  }
}

export default DeliverymanController;
