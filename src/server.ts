import express from 'express';
import { AppDataSource } from './data-source';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.get('/', (_req, res) => {
    return res.json({ message: 'Hello world' });
  });

  return app.listen(process.env.PORT, () =>
    console.log(`server is running in http://localhost:${process.env.PORT}`),
  );
});
