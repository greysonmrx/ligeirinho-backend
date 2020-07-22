import { getCustomRepository } from 'typeorm';

import RecipientsRepository from '../../repositories/RecipientsRepository';

import Recipient from '../../models/Recipient';

import AppError from '../../errors/AppError';

class ListRecipientService {
  public async execute(recipient_id: string): Promise<Recipient> {
    const recipientsRepository = getCustomRepository(RecipientsRepository);

    const recipient = await recipientsRepository.findById(recipient_id);

    if (!recipient) {
      throw new AppError('Destinatário não encontrado.', 404);
    }

    return recipient;
  }
}

export default ListRecipientService;
