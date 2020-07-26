import { getCustomRepository } from 'typeorm';

import RecipientsRepository from '../../repositories/RecipientsRepository';

import AppError from '../../errors/AppError';

class DeleteRecipientService {
  public async execute(recipient_id: string): Promise<void> {
    const recipientsRepository = getCustomRepository(RecipientsRepository);

    const recipient = await recipientsRepository.findById(recipient_id);

    if (!recipient) {
      throw new AppError('Destinatário não encontrado.', 404);
    }

    await recipientsRepository.delete(recipient_id);
  }
}

export default DeleteRecipientService;
