import { formatJSONResponse } from '@libs/apiGateway';
import speakeasy, { GeneratedSecret } from 'speakeasy';
import { ISpekeasyProvaider } from '../ISpekeasyProvider';

class SpekeasyProvaider implements ISpekeasyProvaider {
  async generate(): Promise<GeneratedSecret> {
    const secret = speakeasy.generateSecret();
    return secret;
  }

  async validaded(secret: string, code: string): Promise<void> {
    const validaded = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: code,
      window: 0.5,
    });

    if (!validaded) {
      throw formatJSONResponse('Invalid code', 401);
    }
  }
}

export { SpekeasyProvaider };
