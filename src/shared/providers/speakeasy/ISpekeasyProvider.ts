import { GeneratedSecret } from 'speakeasy';

export interface ISpekeasyProvaider {
  generate(): Promise<GeneratedSecret>;
  validaded(secret: string, code: string): Promise<void>;
}
