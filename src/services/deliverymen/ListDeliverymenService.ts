import { getCustomRepository, Like } from 'typeorm';
import { classToClass } from 'class-transformer';

import DeliverymenRepository from '../../repositories/DeliverymenRepository';

import DeliveryMan from '../../models/DeliveryMan';

interface Request {
  deliveryman_name?: string;
  page: number;
  limit: number;
}

interface Response {
  deliverymen: DeliveryMan[];
  page_count: number;
  total_pages: number;
  current_page: number;
  total_items: number;
  per_page: number;
}

class ListDeliverymenService {
  public async execute({
    deliveryman_name,
    page,
    limit,
  }: Request): Promise<Response> {
    const deliverymenRepository = getCustomRepository(DeliverymenRepository);

    let where = {};

    if (deliveryman_name) {
      where = { name: Like(`%${deliveryman_name}%`) };
    }

    const [deliverymen, count] = await deliverymenRepository.findAndCount({
      where,
      skip: page * limit - limit,
      take: limit,
      relations: ['avatar'],
    });

    return {
      deliverymen: classToClass(deliverymen),
      page_count: deliverymen.length,
      total_pages: Math.ceil(count / limit),
      current_page: page,
      total_items: count,
      per_page: limit,
    };
  }
}

export default ListDeliverymenService;
