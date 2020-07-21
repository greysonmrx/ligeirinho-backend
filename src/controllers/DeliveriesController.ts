import { Request, Response } from 'express';

import ListDeliveryService from '../services/ListDeliveryService';
import DeleteDeliveryService from '../services/DeleteDeliveryService';
import CreateDeliveryService from '../services/CreateDeliveryService';
import UpdateDeliveryService from '../services/UpdateDeliveryService';

class DeliveriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDeliveries = new ListDeliveryService();

    const deliveries = await listDeliveries.execute();

    return response.status(200).json(deliveries);
  }

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { product, recipient_id, deliveryman_id } = request.body;
    const { id } = request.params;

    const updateDeliveries = new UpdateDeliveryService();

    const delivery = await updateDeliveries.execute({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });

    return response.status(200).json(delivery);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteDeliveries = new DeleteDeliveryService();

    await deleteDeliveries.execute(id);

    return response.status(204).json();
  }
}

export default DeliveriesController;
