import { Router } from 'express';

import DeliverymanController from '../controllers/DeliverymanController';
import DeliveryDeliveredController from '../controllers/DeliveryDeliveredController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const deliverymanRouter = Router();
const deliverymanController = new DeliverymanController();
const deliveryDeliveredController = new DeliveryDeliveredController();

deliverymanRouter.get('/:id/deliveries', deliveryDeliveredController.index);
deliverymanRouter.use(ensureAuthenticated);
deliverymanRouter.get('/', deliverymanController.index);
deliverymanRouter.post('/', deliverymanController.store);
deliverymanRouter.delete('/:id', deliverymanController.destroy);
deliverymanRouter.put('/:id', deliverymanController.update);

export default deliverymanRouter;
