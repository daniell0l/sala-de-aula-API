import { Response } from 'express';
import { regexValidation } from './regexValidation';

function passwordValidation(password: string, res?: Response): void {
  const passwordMinimumSize = 8;

  regexValidation({
    expression: /[a-z]/,
    value: password,
    messageError: 'A senha deve ter pelo menos uma letra minúscula',
  });

  regexValidation({
    expression: /[A-Z]/,
    value: password,
    messageError: 'A senha deve ter pelo menos uma letra maiúscula',
  });

  regexValidation({
    expression: /[0-9]/,
    value: password,
    messageError: 'A senha deve ter pelo menos um número',
  });

  regexValidation({
    expression: /[!|@|#|$|%|^|&|*|(|)|-|_]/,
    value: password,
    messageError: 'A senha deve ter pelo menos um caractere especial',
  });

  const passwordSize = password.length;
  if (passwordSize < passwordMinimumSize) {
    throw res
      .json({ error: 'A senha deve ter pelo menos 8 caracteres.' })
      .status(400);
  }
}

export { passwordValidation };
