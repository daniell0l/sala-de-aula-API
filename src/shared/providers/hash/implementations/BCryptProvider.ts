import bcrypt from 'bcrypt';
import { IHashProvider } from '../IHashProvider';

class BCryptProvider implements IHashProvider {
  async hash(value: string): Promise<string> {
    const hashed = await bcrypt.hash(value, 8);
    return hashed;
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hashedValue);
    return isValid;
  }
}

export { BCryptProvider };
