import { Repository, EntityRepository } from 'typeorm';

import Delivery from '../models/Delivery';

@EntityRepository(Delivery)
class DeliveriesRepository extends Repository<Delivery> {
  public async findById(id: string): Promise<Delivery | undefined> {
    const findDelivery = await this.findOne({ where: { id } });

    return findDelivery;
  }
}

export default DeliveriesRepository;
