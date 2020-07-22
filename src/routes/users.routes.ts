import { Router } from 'express';

import UsersController from '../controllers/users/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(ensureAuthenticated);
usersRouter.post('/', usersController.store);
usersRouter.put('/', usersController.update);

export default usersRouter;
