import { getCustomRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';

import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

class UpdateUserService {
  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const userExistsWithEmail = await usersRepository.findByEmail(email);

    if (userExistsWithEmail && userExistsWithEmail.id !== user_id) {
      throw new AppError('Já existe outro usuário utilizando este e-mail.');
    }

    Object.assign(user, { name, email });

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha atual para criar outra.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Senha atual incorreta.', 401);
      }

      user.password = await hash(password, 8);
    }

    return usersRepository.save(user);
  }
}

export default UpdateUserService;
