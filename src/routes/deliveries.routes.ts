import { Router } from 'express';

import DeliveriesController from '../controllers/DeliveriesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const deliveriesRouter = Router();
const deliveriesController = new DeliveriesController();

deliveriesRouter.use(ensureAuthenticated);
deliveriesRouter.post('/', deliveriesController.store);
deliveriesRouter.delete('/:id', deliveriesController.destroy);

export default deliveriesRouter;
