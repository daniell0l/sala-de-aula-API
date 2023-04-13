/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

import { formatJSONResponse } from '@libs/apiGateway';
import { IConfigProviderMail, IMailProvider } from '../IMailProvider';

class MailProvider implements IMailProvider {
  private client: Transporter;

  constructor({ host, user, pass, port }: IConfigProviderMail) {
    this.client = nodemailer.createTransport({
      host,
      port,
      auth: {
        user,
        pass,
      },
    });
  }

  async send(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);
    try {
      await this.client.sendMail({
        to,
        from: 'noreply@D&Ccloudsolution.com.br',
        subject,
        html: templateHTML,
      });
    } catch (err) {
      console.error(
        `Não foi posso enviar o e-mail, por favor tente mais tarde: ${err.message}`,
      );
      throw formatJSONResponse(
        'Não foi posso enviar o e-mail, por favor tente mais tarde',
        500,
      );
    }
  }
}

export { MailProvider };
