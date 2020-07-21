import { Router } from 'express';

import DeliverymanController from '../controllers/DeliverymanController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const deliverymanRouter = Router();
const deliverymanController = new DeliverymanController();

deliverymanRouter.use(ensureAuthenticated);
deliverymanRouter.get('/', deliverymanController.index);
deliverymanRouter.post('/', deliverymanController.store);

export default deliverymanRouter;
