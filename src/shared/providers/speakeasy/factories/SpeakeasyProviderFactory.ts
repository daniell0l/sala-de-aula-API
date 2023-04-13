import { ISpekeasyProvaider } from '../ISpekeasyProvider';
import { SpekeasyProvaider } from '../implementations/SpekeasyProvaider';

function SpeakeasyProviderFactory(): ISpekeasyProvaider {
  return new SpekeasyProvaider();
}

export { SpeakeasyProviderFactory };
