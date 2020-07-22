import { Request, Response } from 'express';

import ListPendingDeliveriesService from '../../services/delivery/ListPendingDeliveriesService';

class DeliveryPendingController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { deliveryman_id } = request.params;

    const listPendingDeliveries = new ListPendingDeliveriesService();

    const deliveries = await listPendingDeliveries.execute(deliveryman_id);

    return response.status(200).json(deliveries);
  }
}

export default DeliveryPendingController;
