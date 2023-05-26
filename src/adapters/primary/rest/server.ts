import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import { configureBookingController } from './controllers/bookingController';
import { inMemoryDevDependencies } from './dependencies/easyDevDependencies';
import { devDependencies } from './dependencies/devDependencies';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './modules/logger';
import { env } from './env';

config();

const app = express();

app
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use((req, res, next) => {
    res.on('finish', () => {
      logger.info(
        `${new Date().toISOString()}  ${req.url} - ${res.statusCode}`,
      );
    });
    next();
  })
  .all('*', (_req, res) => {
    res.status(404).send({ message: 'Not Found' });
  });

if (env.IN_MEMORY) {
  logger.info('In Memory Dev Mode');
  configureBookingController(app, inMemoryDevDependencies());
} else {
  logger.info('Postgres Dev Mode');
  configureBookingController(app, devDependencies());
}

// should live here after the routes to catch errors from them
app.use(errorHandler);

app.listen(env.PORT, () =>
  logger.info(`Started App URL: http://localhost:${env.PORT}`),
);
