import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import recipientsRouter from './recipients.routes';
import filesRouter from './files.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/recipients', recipientsRouter);
routes.use('/files', filesRouter);

export default routes;
