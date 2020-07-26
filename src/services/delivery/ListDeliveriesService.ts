import { getCustomRepository, Like, Equal } from 'typeorm';
import { classToClass } from 'class-transformer';

import DeliveriesRepository from '../../repositories/DeliveriesRepository';

import Delivery from '../../models/Delivery';

interface Request {
  product_name?: string;
  status?: string;
  page: number;
  limit: number;
}

interface Response {
  deliveries: Delivery[];
  page_count: number;
  total_pages: number;
  current_page: number;
  total_items: number;
  per_page: number;
}

class ListDeliveriesService {
  public async execute({
    product_name,
    status,
    page,
    limit,
  }: Request): Promise<Response> {
    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    const where = {};

    if (product_name) {
      Object.assign(where, { product: Like(`%${product_name}%`) });
    }

    if (status) {
      Object.assign(where, { status: Equal(status) });
    }

    const [deliveries, count] = await deliveriesRepository.findAndCount({
      where,
      skip: page * limit - limit,
      take: limit,
      relations: [
        'recipient',
        'deliveryman',
        'deliveryman.avatar',
        'signature',
      ],
    });

    return {
      deliveries: classToClass(deliveries),
      page_count: deliveries.length,
      current_page: page,
      per_page: limit,
      total_items: count,
      total_pages: Math.ceil(count / limit),
    };
  }
}

export default ListDeliveriesService;
