import { Request, Response } from 'express';

import ListDeliveryDeliveredService from '../services/ListDeliveryDeliveredService';

class DeliveryDeliveredController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listDeliveryDelivered = new ListDeliveryDeliveredService();

    const deliveries = await listDeliveryDelivered.execute(id);

    return response.status(200).json(deliveries);
  }
}

export default DeliveryDeliveredController;
