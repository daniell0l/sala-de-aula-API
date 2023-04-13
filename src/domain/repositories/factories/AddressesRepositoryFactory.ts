import { AddressesRepository } from '../../infra/repositories/AddressesRepository';
import { IAddressesRepository } from '../IAddressesRepository';

function AddressesRepositoryFactory(): IAddressesRepository {
  return new AddressesRepository();
}

export { AddressesRepositoryFactory };
