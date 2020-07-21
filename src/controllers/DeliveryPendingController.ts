import { Request, Response } from 'express';

import ListDeliveryPendingService from '../services/ListDeliveryPendingService';

class DeliveryPendingController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listDeliveriesPending = new ListDeliveryPendingService();

    const deliveries = await listDeliveriesPending.execute(id);

    return response.status(200).json(deliveries);
  }
}

export default DeliveryPendingController;
