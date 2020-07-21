import { Repository, EntityRepository } from 'typeorm';

import Delivery from '../models/Delivery';

@EntityRepository(Delivery)
class DeliveriesRepository extends Repository<Delivery> {
  /* Anything */
}

export default DeliveriesRepository;
