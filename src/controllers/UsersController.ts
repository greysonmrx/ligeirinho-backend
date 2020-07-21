import { Response, Request } from 'express';

import UpdateUserService from '../services/UpdateUserService';
import CreateUserService from '../services/CreateUserService';

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

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

    delete user.password;

    return response.status(200).json(user);
  }
}

export default UsersController;
