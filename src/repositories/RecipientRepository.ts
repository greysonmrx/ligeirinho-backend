import { Repository, EntityRepository } from 'typeorm';

import Recipient from '../models/Recipient';

@EntityRepository(Recipient)
class RecipientRepository extends Repository<Recipient> {
  /* Anything */
}

export default RecipientRepository;
