import { Router } from 'express';

import DeliveriesController from '../controllers/delivery/DeliveriesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const deliveriesRouter = Router();
const deliveriesController = new DeliveriesController();

deliveriesRouter.use(ensureAuthenticated);
deliveriesRouter.get('/:delivery_id', deliveriesController.show);
deliveriesRouter.get('/', deliveriesController.index);
deliveriesRouter.post('/', deliveriesController.store);
deliveriesRouter.delete('/:delivery_id', deliveriesController.destroy);
deliveriesRouter.put('/:delivery_id', deliveriesController.update);

export default deliveriesRouter;
