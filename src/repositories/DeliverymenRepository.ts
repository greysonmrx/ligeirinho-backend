import { EntityRepository, Repository } from 'typeorm';

import DeliveryMan from '../models/DeliveryMan';

@EntityRepository(DeliveryMan)
class DeliverymanRepository extends Repository<DeliveryMan> {
  public async findById(
    deliveryman_id: string,
  ): Promise<DeliveryMan | undefined> {
    const findDeliveryman = await this.findOne({
      where: { id: deliveryman_id },
    });

    return findDeliveryman;
  }

  public async findByEmail(email: string): Promise<DeliveryMan | undefined> {
    const findDeliveryman = await this.findOne({ where: { email } });

    return findDeliveryman;
  }
}

export default DeliverymanRepository;
