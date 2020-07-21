import { getCustomRepository } from 'typeorm';

import Recipient from '../models/Recipient';
import RecipientRepository from '../repositories/RecipientRepository';

interface Request {
  name: string;
  street: string;
  number: number;
  complement: string;
  state: string;
  city: string;
  zip_code: string;
}

class CreateRecipientService {
  public async execute({
    name,
    street,
    number,
    complement,
    state,
    city,
    zip_code,
  }: Request): Promise<Recipient> {
    const recipientRepository = getCustomRepository(RecipientRepository);

    const recipient = await recipientRepository.create({
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });

    await recipientRepository.save(recipient);

    return recipient;
  }
}

export default CreateRecipientService;
