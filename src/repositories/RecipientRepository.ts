import { Repository, EntityRepository } from 'typeorm';

import Recipient from '../models/Recipient';

@EntityRepository(Recipient)
class RecipientRepository extends Repository<Recipient> {
  public async findById(id: string): Promise<Recipient | undefined> {
    const findRecipient = await this.findOne({ where: { id } });

    return findRecipient;
  }
}

export default RecipientRepository;
