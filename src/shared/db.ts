/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import 'pg';
import { Connection, createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DB_URL } from './constants';

export class DBManager {
  private static connection: Connection;

  public static async getConnection(): Promise<Connection> {
    if (!DBManager.connection || !DBManager.connection.isConnected) {
      if (DBManager.connection) {
        await DBManager.connection.close();
      }
      DBManager.connection = await createConnection({
        url: DB_URL,
        type: 'postgres',
        entities: [`${__dirname}/**/entities/*.{ts, js}`],
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(),
      });
    }

    return DBManager.connection;
  }
}
