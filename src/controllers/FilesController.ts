import { Response, Request } from 'express';

import CreateFileService from '../services/CreateFileService';

class FileController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { originalname: name, filename: path } = request.file;

    const createFile = new CreateFileService();

    const file = await createFile.execute({ name, path });

    return response.status(201).json(file);
  }
}

export default FileController;
