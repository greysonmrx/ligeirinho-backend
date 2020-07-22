import { Repository, EntityRepository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findById(user_id: string): Promise<User | undefined> {
    const findUser = await this.findOne({ where: { id: user_id } });

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.findOne({ where: { email } });

    return findUser;
  }
}

export default UsersRepository;
