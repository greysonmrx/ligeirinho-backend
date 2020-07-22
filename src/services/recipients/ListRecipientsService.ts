import { getCustomRepository, Like } from 'typeorm';

import RecipientsRepository from '../../repositories/RecipientsRepository';

import Recipient from '../../models/Recipient';

interface Request {
  recipient_name?: string;
  page: number;
  limit: number;
}

interface Response {
  recipients: Recipient[];
  page_count: number;
  total_pages: number;
  current_page: number;
  total_items: number;
  per_page: number;
}

class ListRecipientsService {
  public async execute({
    recipient_name,
    page,
    limit,
  }: Request): Promise<Response> {
    const recipientsRepository = getCustomRepository(RecipientsRepository);

    let where = {};

    if (recipient_name) {
      where = { name: Like(`%${recipient_name}%`) };
    }

    const [recipients, count] = await recipientsRepository.findAndCount({
      where,
    });

    return {
      recipients,
      page_count: recipients.length,
      total_pages: Math.ceil(count / limit),
      current_page: page,
      total_items: count,
      per_page: limit,
    };
  }
}

export default ListRecipientsService;
