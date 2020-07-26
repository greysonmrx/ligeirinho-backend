import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import ProblemsRepository from '../../repositories/ProblemsRepository';

import Problem from '../../models/Problem';

interface Request {
  page: number;
  limit: number;
}

interface Response {
  problems: Problem[];
  page_count: number;
  total_pages: number;
  current_page: number;
  total_items: number;
  per_page: number;
}

class ListProblemService {
  public async execute({ page, limit }: Request): Promise<Response> {
    const problemsRepository = getCustomRepository(ProblemsRepository);

    const [problems, count] = await problemsRepository.findAndCount({
      skip: page * limit - limit,
      take: limit,
      relations: [
        'delivery',
        'delivery.recipient',
        'delivery.deliveryman',
        'delivery.deliveryman.avatar',
        'delivery.signature',
      ],
    });

    return {
      problems: classToClass(problems),
      page_count: problems.length,
      total_pages: Math.ceil(count / limit),
      current_page: page,
      total_items: count,
      per_page: limit,
    };
  }
}

export default ListProblemService;
