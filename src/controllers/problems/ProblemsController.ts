import { Request, Response } from 'express';

import ListProblemsService from '../../services/problems/ListProblemsService';
import ListDeliveryProblemsService from '../../services/problems/ListDeliveryProblemsService';
import CreateProblemService from '../../services/problems/CreateProblemService';

class ProblemsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;

    const listDeliveryProblems = new ListDeliveryProblemsService();

    const deliveryProblems = await listDeliveryProblems.execute(delivery_id);

    return response.status(200).json(deliveryProblems);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProblems = new ListProblemsService();

    const problems = await listProblems.execute();

    return response.status(200).json(problems);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const { delivery_id } = request.params;

    const createProblem = new CreateProblemService();

    const problem = await createProblem.execute({ delivery_id, description });

    return response.status(201).json(problem);
  }
}

export default ProblemsController;
