import { IHashProvider } from '../IHashProvider';
import { BCryptProvider } from '../implementations/BCryptProvider';

function BCryptProviderFactory(): IHashProvider {
  return new BCryptProvider();
}

export { BCryptProviderFactory };
