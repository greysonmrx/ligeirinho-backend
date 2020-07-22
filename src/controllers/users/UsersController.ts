import { Request, Response } from 'express';

import CreateUserService from '../../services/users/CreateUserService';
import UpdateUserService from '../../services/users/UpdateUserService';

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      user_id: request.user.id,
      name,
      email,
      password,
      old_password,
    });

    return response.status(200).json(user);
  }
}

export default UsersController;
