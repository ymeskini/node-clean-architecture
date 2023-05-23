import express, { Express } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import { configureBookingController } from './controllers/bookingController';
import { easyDevDependencies } from './dependencies/easyDevDependencies';
import { devDependencies } from './dependencies/devDependencies';

const app: Express = express();
if (process.env['NODE_ENV'] !== 'production') {
  config();
}
const port = process.env['PORT'] || 3001;

app
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json());

if (process.env['EASY_DEV'] === 'true') {
  console.log('EASY DEV MODE');
  configureBookingController(app, easyDevDependencies());
} else {
  console.log('DEV MODE');
  configureBookingController(app, devDependencies());
}

app.listen(port, () => console.log(`Started App on port: ${port}!`));
