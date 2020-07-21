import { Repository, EntityRepository } from 'typeorm';

import Deliveryman from '../models/Deliveryman';

@EntityRepository(Deliveryman)
class DeliverymanRepository extends Repository<Deliveryman> {
  public async findById(id: string): Promise<Deliveryman | undefined> {
    const findDeliveryman = await this.findOne({ where: { id } });

    return findDeliveryman;
  }

  public async findByEmail(email: string): Promise<Deliveryman | undefined> {
    const findDeliveryman = await this.findOne({ where: { email } });

    return findDeliveryman;
  }
}

export default DeliverymanRepository;
