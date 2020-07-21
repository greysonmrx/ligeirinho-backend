import { Response, Request } from 'express';

import CreateUserService from '../services/CreateUserService';

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({ name, email, password });

      delete user.password;

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({
        status: 'error',
        message: err.message,
      });
    }
  }
}

export default UsersController;
