import { Router } from 'express';

import DeliveryDeliveredController from '../controllers/delivery/DeliveryDeliveredController';
import DeliveryPendingController from '../controllers/delivery/DeliveryPendingController';
import DeliveryWithdrawController from '../controllers/delivery/DeliveryWithdrawController';
import DeliveryFinishController from '../controllers/delivery/DeliveryFinishController';

const deliverymanRouter = Router();
const deliveryDeliveredController = new DeliveryDeliveredController();
const deliveryPendingController = new DeliveryPendingController();
const deliveryWithdrawController = new DeliveryWithdrawController();
const deliveryFinishController = new DeliveryFinishController();

deliverymanRouter.get(
  '/:delivery_id/deliveries',
  deliveryDeliveredController.index,
);
deliverymanRouter.get('/:deliveryman_id', deliveryPendingController.index);
deliverymanRouter.post(
  '/:deliveryman_id/delivery/:delivery_id',
  deliveryWithdrawController.store,
);
deliverymanRouter.post(
  '/:deliveryman_id/delivery/:delivery_id/finish',
  deliveryFinishController.store,
);

export default deliverymanRouter;
