import { Request, Response } from 'express';

import CreateProblemService from '../../services/problems/CreateProblemService';

class ProblemsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const { delivery_id } = request.params;

    const createProblem = new CreateProblemService();

    const problem = await createProblem.execute({ delivery_id, description });

    return response.status(201).json(problem);
  }
}

export default ProblemsController;