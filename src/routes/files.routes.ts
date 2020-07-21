import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../config/multer';

import FilesController from '../controllers/FilesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const upload = multer(multerConfig);

const filesRouter = Router();
const filesController = new FilesController();

filesRouter.use(ensureAuthenticated);
filesRouter.post('/', upload.single('file'), filesController.store);

export default filesRouter;
