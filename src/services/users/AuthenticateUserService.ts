import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import UsersRepository from '../../repositories/UsersRepository';

import User from '../../models/User';

import AppError from '../../errors/AppError';

import authConfig from '../../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      throw new AppError('Senha incorreta.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
