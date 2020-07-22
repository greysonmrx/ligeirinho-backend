import { getCustomRepository, Like } from 'typeorm';

import DeliveriesRepository from '../../repositories/DeliveriesRepository';

import Delivery from '../../models/Delivery';

interface Request {
  product_name?: string;
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
    page,
    limit,
  }: Request): Promise<Response> {
    const deliveriesRepository = getCustomRepository(DeliveriesRepository);

    let where = {};

    if (product_name) {
      where = { product: Like(`%${product_name}%`) };
    }

    const [deliveries, count] = await deliveriesRepository.findAndCount({
      where,
      skip: page * limit - limit,
      take: limit,
      relations: ['recipient', 'deliveryman', 'signature'],
    });

    return {
      deliveries,
      page_count: deliveries.length,
      current_page: page,
      per_page: limit,
      total_items: count,
      total_pages: Math.ceil(count / limit),
    };
  }
}

export default ListDeliveriesService;
