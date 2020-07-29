import { Router } from 'express';

import ProblemsController from '../controllers/problems/ProblemsController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const problemsRouter = Router();
const problemsController = new ProblemsController();

problemsRouter.post('/:delivery_id', problemsController.store);
problemsRouter.get('/:delivery_id', problemsController.show);
problemsRouter.use(ensureAuthenticated);
problemsRouter.get('/', problemsController.index);
problemsRouter.delete(
  '/:problem_id/cancel-delivery',
  problemsController.destroy,
);

export default problemsRouter;
