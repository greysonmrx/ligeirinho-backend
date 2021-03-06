import { Request, Response } from 'express';

import ListProblemsService from '../../services/problems/ListProblemsService';
import ListDeliveryProblemsService from '../../services/problems/ListDeliveryProblemsService';
import CreateProblemService from '../../services/problems/CreateProblemService';
import CancelDeliveryService from '../../services/delivery/CancelDeliveryService';

class ProblemsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params;

    const listDeliveryProblems = new ListDeliveryProblemsService();

    const deliveryProblems = await listDeliveryProblems.execute(delivery_id);

    return response.status(200).json(deliveryProblems);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 5 } = request.query;

    const listProblems = new ListProblemsService();

    const {
      problems,
      page_count,
      current_page,
      per_page,
      total_items,
      total_pages,
    } = await listProblems.execute({
      page: Number(page),
      limit: Number(limit),
    });

    return response.status(200).json({
      problems,
      page_count,
      current_page,
      per_page,
      total_items,
      total_pages,
    });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const { delivery_id } = request.params;

    const createProblem = new CreateProblemService();

    const problem = await createProblem.execute({ delivery_id, description });

    return response.status(201).json(problem);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { problem_id } = request.params;

    const cancelDelivery = new CancelDeliveryService();

    await cancelDelivery.execute(problem_id);

    return response.status(204).json();
  }
}

export default ProblemsController;
