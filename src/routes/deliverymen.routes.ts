import { Router } from 'express';

import DeliverymenController from '../controllers/deliverymen/DeliverymenController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const deliverymenRouter = Router();
const deliverymenController = new DeliverymenController();

deliverymenRouter.get('/:deliveryman_id', deliverymenController.show);
deliverymenRouter.use(ensureAuthenticated);
deliverymenRouter.get('/', deliverymenController.index);
deliverymenRouter.post('/', deliverymenController.store);
deliverymenRouter.delete('/:deliveryman_id', deliverymenController.destroy);
deliverymenRouter.put('/:deliveryman_id', deliverymenController.update);

export default deliverymenRouter;
