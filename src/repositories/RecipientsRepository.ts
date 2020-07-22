import { EntityRepository, Repository } from 'typeorm';

import Recipient from '../models/Recipient';

@EntityRepository(Recipient)
class RecipientRepository extends Repository<Recipient> {
  public async findById(recipient_id: string): Promise<Recipient | undefined> {
    const findRecipient = await this.findOne({ where: { id: recipient_id } });

    return findRecipient;
  }
}

export default RecipientRepository;
