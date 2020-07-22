import { getCustomRepository } from 'typeorm';

import RecipientsRepository from '../../repositories/RecipientsRepository';

import Recipient from '../../models/Recipient';

import AppError from '../../errors/AppError';

interface Request {
  recipient_id: string;
  name: string;
  street: string;
  number: number;
  complement: string;
  state: string;
  city: string;
  zip_code: string;
}

class UpdateRecipientService {
  public async execute({
    recipient_id,
    name,
    street,
    number,
    complement,
    state,
    city,
    zip_code,
  }: Request): Promise<Recipient> {
    const recipientsRepository = getCustomRepository(RecipientsRepository);

    const recipient = await recipientsRepository.findById(recipient_id);

    if (!recipient) {
      throw new AppError('Destinatário não encontrado.', 404);
    }

    const updatedRecipient = await recipientsRepository.save({
      id: recipient_id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });

    return updatedRecipient;
  }
}

export default UpdateRecipientService;
