import { getCustomRepository } from 'typeorm';

import RecipientRepository from '../repositories/RecipientRepository';
import AppError from '../errors/AppError';
import Recipient from '../models/Recipient';

interface Request {
  id: string;
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
    id,
    name,
    street,
    number,
    complement,
    state,
    city,
    zip_code,
  }: Request): Promise<Recipient> {
    const recipientRepository = getCustomRepository(RecipientRepository);

    const recipient = await recipientRepository.findById(id);

    if (!recipient) {
      throw new AppError('Destinatário não encontrado.', 404);
    }

    const updatedRecipient = await recipientRepository.save({
      id,
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
