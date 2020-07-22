import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import recipientsRouter from './recipients.routes';
import filesRouter from './files.routes';
import deliverymanRouter from './deliveryman.routes';
import deliveriesRouter from './deliveries.routes';
import deliverymenRouter from './deliverymen.routes';
import problemsRouter from './problems.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/recipients', recipientsRouter);
routes.use('/files', filesRouter);
routes.use('/deliveryman', deliverymanRouter);
routes.use('/deliveries', deliveriesRouter);
routes.use('/deliverymen', deliverymenRouter);
routes.use('/problems', problemsRouter);

export default routes;
