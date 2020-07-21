import { Repository, EntityRepository } from 'typeorm';

import File from '../models/File';

@EntityRepository(File)
class FileRepository extends Repository<File> {
  public async findById(id: string): Promise<File | undefined> {
    const findFile = await this.findOne({ where: { id } });

    return findFile;
  }

  public async findByPath(path: string): Promise<File | undefined> {
    const findFile = await this.findOne({ where: { path } });

    return findFile;
  }
}

export default FileRepository;
