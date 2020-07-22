import { getCustomRepository } from 'typeorm';

import RecipientsRepository from '../../repositories/RecipientsRepository';

import Recipient from '../../models/Recipient';

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
    const recipientsRepository = getCustomRepository(RecipientsRepository);

    const recipient = await recipientsRepository.create({
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });

    await recipientsRepository.save(recipient);

    return recipient;
  }
}

export default CreateRecipientService;
