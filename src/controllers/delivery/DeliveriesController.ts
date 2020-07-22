import { Request, Response } from 'express';

import ListDeliveriesService from '../../services/delivery/ListDeliveriesService';
import DeleteDeliveryService from '../../services/delivery/DeleteDeliveryService';
import CreateDeliveryService from '../../services/delivery/CreateDeliveryService';
import UpdateDeliveryService from '../../services/delivery/UpdateDeliveryService';

interface IListDeliveries {
  product_name?: string;
  page: number;
  limit: number;
}

class DeliveriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { q: product_name, page = 1, limit = 5 } = request.query;

    const listDeliveries = new ListDeliveriesService();

    const {
      deliveries,
      page_count,
      current_page,
      per_page,
      total_items,
      total_pages,
    } = await listDeliveries.execute({
      product_name,
      page: Number(page),
      limit: Number(limit),
    } as IListDeliveries);

    return response.status(200).json({
      deliveries,
      page_count,
      current_page,
      per_page,
      total_items,
      total_pages,
    });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { product, recipient_id, deliveryman_id } = request.body;

    const createDelivery = new CreateDeliveryService();

    const delivery = await createDelivery.execute({
      product,
      recipient_id,
      deliveryman_id,
    });

    return response.status(201).json(delivery);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { product, recipient_id, deliveryman_id } = request.body;
    const { delivery_id } = request.params;

    const updateDelivery = new UpdateDeliveryService();

    const delivery = await updateDelivery.execute({
      delivery_id,
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
    const { delivery_id } = request.params;

    const deleteDelivery = new DeleteDeliveryService();

    await deleteDelivery.execute(delivery_id);

    return response.status(204).json();
  }
}

export default DeliveriesController;
