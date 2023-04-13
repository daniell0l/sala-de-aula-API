import { IQrcodeProvider } from '../IQrcodeProvider';
import { QrcodeProvider } from '../implementations/QrcodeProvider';

function QrcodeProviderFactory(): IQrcodeProvider {
  return new QrcodeProvider();
}

export { QrcodeProviderFactory };
