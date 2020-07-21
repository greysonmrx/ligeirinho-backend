import { getCustomRepository } from 'typeorm';

import File from '../models/File';
import FileRepository from '../repositories/FilesRepository';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  path: string;
}

class CreateFileService {
  public async execute({ name, path }: Request): Promise<File> {
    const filesRepository = getCustomRepository(FileRepository);

    const fileExistsWithPath = await filesRepository.findByPath(path);

    if (fileExistsWithPath) {
      throw new AppError('Este caminho já está sendo usado por outro arquivo.');
    }

    const file = await filesRepository.create({ name, path });

    await filesRepository.save(file);

    return file;
  }
}

export default CreateFileService;
