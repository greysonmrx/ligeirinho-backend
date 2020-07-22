import { Request, Response } from 'express';

import ListDeliverymenService from '../../services/deliverymen/ListDeliverymenService';
import CreateDeliveryManService from '../../services/deliverymen/CreateDeliveryManService';
import UpdateDeliveryManService from '../../services/deliverymen/UpdateDeliveryManService';
import DeleteDeliveryManService from '../../services/deliverymen/DeleteDeliveryManService';

class DeliverymenController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listDeliverymen = new ListDeliverymenService();

    const deliverymen = await listDeliverymen.execute();

    return response.status(200).json(deliverymen);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, avatar_id } = request.body;

    const createDeliveryMan = new CreateDeliveryManService();

    const deliveryMan = await createDeliveryMan.execute({
      name,
      email,
      avatar_id,
    });

    return response.status(201).json(deliveryMan);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, avatar_id } = request.body;
    const { deliveryman_id } = request.params;

    const updateDeliveryMan = new UpdateDeliveryManService();

    const deliveryMan = await updateDeliveryMan.execute({
      deliveryman_id,
      name,
      email,
      avatar_id,
    });

    return response.status(200).json(deliveryMan);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { deliveryman_id } = request.params;

    const deleteDeliveryMan = new DeleteDeliveryManService();

    await deleteDeliveryMan.execute(deliveryman_id);

    return response.status(204).json();
  }
}

export default DeliverymenController;
