import { Request, Response } from 'express';

import ListRecipientService from '../../services/recipients/ListRecipientService';
import ListRecipientsService from '../../services/recipients/ListRecipientsService';
import CreateRecipientService from '../../services/recipients/CreateRecipientService';
import UpdateRecipientService from '../../services/recipients/UpdateRecipientService';

interface IListRecipients {
  recipient_name?: string;
  page: number;
  limit: number;
}

class RecipientsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { recipient_id } = request.params;

    const listRecipient = new ListRecipientService();

    const recipient = await listRecipient.execute(recipient_id);

    return response.status(200).json(recipient);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { q: recipient_name, page = 1, limit = 5 } = request.query;

    const listRecipients = new ListRecipientsService();

    const {
      recipients,
      page_count,
      total_pages,
      current_page,
      total_items,
      per_page,
    } = await listRecipients.execute({
      recipient_name,
      page: Number(page),
      limit: Number(limit),
    } as IListRecipients);

    return response.status(200).json({
      recipients,
      page_count,
      total_pages,
      current_page,
      total_items,
      per_page,
    });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = request.body;

    const createRecipient = new CreateRecipientService();

    const recipient = await createRecipient.execute({
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });

    return response.status(201).json(recipient);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = request.body;

    const { recipient_id } = request.params;

    const updateRecipient = new UpdateRecipientService();

    const recipient = await updateRecipient.execute({
      recipient_id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });

    return response.status(200).json(recipient);
  }
}

export default RecipientsController;
