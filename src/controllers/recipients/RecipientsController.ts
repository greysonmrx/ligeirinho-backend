import { Request, Response } from 'express';

import CreateRecipientService from '../../services/recipients/CreateRecipientService';
import UpdateRecipientService from '../../services/recipients/UpdateRecipientService';

class RecipientsController {
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
