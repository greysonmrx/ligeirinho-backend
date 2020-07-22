import { Request, Response } from 'express';

import ListDeliveredDeliveriesService from '../../services/delivery/ListDeliveredDeliveriesService';

class DeliveryDeliveredController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;

    const listDeliveredDeliveries = new ListDeliveredDeliveriesService();

    const deliveries = await listDeliveredDeliveries.execute(delivery_id);

    return response.status(200).json(deliveries);
  }
}

export default DeliveryDeliveredController;
