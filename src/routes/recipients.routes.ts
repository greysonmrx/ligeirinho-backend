import { Router } from 'express';

import RecipientsController from '../controllers/recipients/RecipientsController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const recipientsRouter = Router();
const recipientController = new RecipientsController();

recipientsRouter.use(ensureAuthenticated);
recipientsRouter.get('/:recipient_id', recipientController.show);
recipientsRouter.get('/', recipientController.index);
recipientsRouter.post('/', recipientController.store);
recipientsRouter.put('/:recipient_id', recipientController.update);
recipientsRouter.delete('/:recipient_id', recipientController.destroy);

export default recipientsRouter;
