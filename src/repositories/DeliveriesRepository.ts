import { EntityRepository, Repository } from 'typeorm';

import Delivery from '../models/Delivery';

@EntityRepository(Delivery)
class DeliveriesRepository extends Repository<Delivery> {
  public async findById(delivery_id: string): Promise<Delivery | undefined> {
    const findDelivery = await this.findOne({ where: { id: delivery_id } });

    return findDelivery;
  }
}

export default DeliveriesRepository;
