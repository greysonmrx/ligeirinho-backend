import { Response, Request } from 'express';

import CreateDeliveryWithdrawService from '../services/CreateDeliveryWithdrawService';

class DeliveryWithdrawController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { deliveryman_id, delivery_id } = request.params;
    const { start_date } = request.body;

    const createDeliveryWithdraw = new CreateDeliveryWithdrawService();

    await createDeliveryWithdraw.execute({
      deliveryman_id,
      delivery_id,
      start_date,
    });

    return response.status(204).json();
  }
}

export default DeliveryWithdrawController;
