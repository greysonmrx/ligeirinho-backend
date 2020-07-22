import { Request, Response } from 'express';

import WithdrawDeliveryService from '../../services/delivery/WithdrawDeliveryService';

class DeliveryWithdrawController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { deliveryman_id, delivery_id } = request.params;
    // const { start_date } = request.body;

    const withdrawDelivery = new WithdrawDeliveryService();

    await withdrawDelivery.execute({
      deliveryman_id,
      delivery_id,
      // start_date,
    });

    return response.status(204).json();
  }
}

export default DeliveryWithdrawController;
