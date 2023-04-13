import { ICreateAddress } from './ICreateAddress';
import { ICreateContact } from './ICreateContact';
import { ICreateIndividualRequest } from './ICreateIndividual';
import { ICreateUser } from './ICreateUser';

interface ICreateIndividualBody {
  user?: ICreateUser;
  individual: ICreateIndividualRequest;
  address: ICreateAddress;
  contacts: ICreateContact[];
}

export { ICreateIndividualBody };
