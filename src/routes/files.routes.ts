import { Router } from 'express';
import multer from 'multer';

import FilesController from '../controllers/files/FilesController';

import multerConfig from '../config/multer';

const upload = multer(multerConfig);

const filesRouter = Router();
const filesController = new FilesController();

filesRouter.post('/', upload.single('file'), filesController.store);

export default filesRouter;
