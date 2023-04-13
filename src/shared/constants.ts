import dotenv from 'dotenv';
import * as Logger from 'bunyan';

dotenv.config({
  path: process.env.NODE_ENV === 'localhost' ? '.env.localhost' : '.env.dev',
});

export const { ENV, DB_URL } = process.env;

const { LOG_LEVEL: LOG_LEVEL_STRING = 'info' } = process.env;

// Mapeamento dos nomes dos níveis de log para os valores numéricos correspondentes
const LOG_LEVELS_MAP = {
  trace: Logger.TRACE,
  debug: Logger.DEBUG,
  info: Logger.INFO,
  warn: Logger.WARN,
  error: Logger.ERROR,
  fatal: Logger.FATAL
};

export const LOG_LEVEL = LOG_LEVELS_MAP[LOG_LEVEL_STRING as keyof typeof LOG_LEVELS_MAP];

export const DEVELOP_ENV = ENV === 'localhost' || ENV === 'dev';

export const TYPE_RESET_EMAIL = 0;
