interface IMailProvider {
  send(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void>;
}

interface IConfigProviderMail {
  host: string;
  user: string;
  pass: string;
  port: number;
}

export { IMailProvider, IConfigProviderMail };
