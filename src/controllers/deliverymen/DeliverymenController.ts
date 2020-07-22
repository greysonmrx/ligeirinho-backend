import { Request, Response } from 'express';

import ListDeliverymenService from '../../services/deliverymen/ListDeliverymenService';
import CreateDeliveryManService from '../../services/deliverymen/CreateDeliveryManService';
import UpdateDeliveryManService from '../../services/deliverymen/UpdateDeliveryManService';
import DeleteDeliveryManService from '../../services/deliverymen/DeleteDeliveryManService';

interface IListDelivermen {
  product_name?: string;
  page: number;
  limit: number;
}

class DeliverymenController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { q: deliveryman_name, page = 1, limit = 5 } = request.query;

    const listDeliverymen = new ListDeliverymenService();

    const {
      deliverymen,
      current_page,
      page_count,
      per_page,
      total_items,
      total_pages,
    } = await listDeliverymen.execute({
      deliveryman_name,
      page: Number(page),
      limit: Number(limit),
    } as IListDelivermen);

    return response.status(200).json({
      deliverymen,
      current_page,
      page_count,
      per_page,
      total_items,
      total_pages,
    });
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
