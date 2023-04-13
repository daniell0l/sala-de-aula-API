import 'dotenv/config';
import { IMailProvider } from '../IMailProvider';
import { MailProvider } from '../implementations/MailProvider';

function MailProviderFactory(): IMailProvider {
  return new MailProvider({
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    port: Number(process.env.MAIL_PORT),
  });
}

export { MailProviderFactory };
