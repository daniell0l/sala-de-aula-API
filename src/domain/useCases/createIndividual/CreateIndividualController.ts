import { TransactionsRepositoryFactory } from '@domain/people/repositories/factories/TransactionsRepositoryFactory';
import { formatJSONResponse } from '@libs/apiGateway';
import { MailProviderFactory } from '@shared/providers/mail/factories/MailProviderFactory';
import { QrcodeProviderFactory } from '@shared/providers/qrcode/factories/QrcodeProviderFactory';
import { SpeakeasyProviderFactory } from '@shared/providers/speakeasy/factories/SpeakeasyProviderFactory';
import { AddressesRepositoryFactory } from '../../repositories/factories/AddressesRepositoryFactory';
import { ContactsRepositoryFactory } from '../../repositories/factories/ContactsRepositoryFactory';
import { IndividualRepositoryFactory } from '../../repositories/factories/IndividualRepositoryFactory';
import { UsersRepositoryFactory } from '../../repositories/factories/UsersRepositoryFactory';
import { CreateIndividualUseCaseFactory } from '../factories/CreateIndividualUseCaseFactory';

class CreateIndividualController {
  public async handler(data: any): Promise<void> {
    CreateIndividualController.validate(data);

    const createIndividualUseCase = CreateIndividualUseCaseFactory(
      UsersRepositoryFactory(),
      ContactsRepositoryFactory(),
      AddressesRepositoryFactory(),
      IndividualRepositoryFactory(),
      SpeakeasyProviderFactory(),
      MailProviderFactory(),
      QrcodeProviderFactory(),
      TransactionsRepositoryFactory(),
    );
    await createIndividualUseCase.execute(data);
  }

  private static validate(data: any): void {
    if (!data) throw formatJSONResponse('data required', 400);
  }
}

export { CreateIndividualController };
