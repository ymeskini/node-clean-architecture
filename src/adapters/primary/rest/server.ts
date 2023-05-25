import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import { configureBookingController } from './controllers/bookingController';
import { inMemoryDevDependencies } from './dependencies/easyDevDependencies';
import { devDependencies } from './dependencies/devDependencies';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './modules/logger';

if (process.env['NODE_ENV'] !== 'production') {
  config();
}
const port = process.env['PORT'] || 3001;

const app = express();

app
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use((req, res, next) => {
    res.on('finish', () => {
      logger.info(`${req.url} ${res.statusCode}`);
    });
    next();
  });

if (process.env['IN_MEMORY'] === 'true') {
  console.log('In Memory Dev Mode');
  configureBookingController(app, inMemoryDevDependencies());
} else {
  console.log('Postgres Dev Mode');
  configureBookingController(app, devDependencies());
}

// should live here after the routes to catch errors from them
app.use(errorHandler);

app.listen(port, () => console.log(`Started App on port: ${port}!`));
