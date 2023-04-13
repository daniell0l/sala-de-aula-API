import { Response } from 'express';

interface RegexValidationProps {
  expression: RegExp;
  value: string;
  messageError: string;
  res?: Response;
}

function regexValidation(props: RegexValidationProps): void {
  const { expression, value, messageError, res } = props;
  if (!expression.test(value)) {
    throw res.json({ error: messageError }).status(400);
  }
}

export { regexValidation };
