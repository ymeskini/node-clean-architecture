import { Dependencies } from './dependencies.interface';
import { EasyTripTypeScanner } from '../../../secondary/gateways/fake/easyTripTypeScanner';
import knex from 'knex';
import { SqlBookingRepository } from '../../../secondary/gateways/real/sqlBookingRepository';
import { SqlUberRepository } from '../../../secondary/gateways/real/sqlUberRepository';
import knexConfig from '../../../../../config/knexfile';

export const devDependencies: () => Dependencies = () => {
  const sqlConnection = knex(knexConfig.development);
  const bookingRepository = new SqlBookingRepository(sqlConnection);
  const uberRepository = new SqlUberRepository(sqlConnection);
  const tripTypeScanner = new EasyTripTypeScanner();

  return {
    bookingRepository,
    tripTypeScanner,
    uberRepository,
  };
};
