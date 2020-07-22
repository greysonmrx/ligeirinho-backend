import { Router } from 'express';

import ProblemsController from '../controllers/problems/ProblemsController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const problemsRouter = Router();
const problemsController = new ProblemsController();

problemsRouter.post('/:delivery_id', problemsController.store);
problemsRouter.use(ensureAuthenticated);

export default problemsRouter;
