import knexConfig from '../../../../../config/knexfile';
import knex from 'knex';
import { resetDB } from '../../../../../tests/utils/utilsForIntegTests';
import { SqlBookingRepository } from './sqlBookingRepository';
import { Booking } from '../../../../businesslogic/models/booking';
import { Position } from '../../../../businesslogic/models/position';
import { TransactionPerformer } from '../../../../businesslogic/gateways/transactionPerformer.interface';
import { KnexTransactionsPerformer } from './knexTransformationsPerformers';

const sqlConnection = knex(knexConfig.tests);

describe('Sql booking repository', () => {
  let sqlBookingRepository: SqlBookingRepository;
  const transactionsPerformer: TransactionPerformer =
    new KnexTransactionsPerformer(sqlConnection);
  const newBookingId = '7de9f5d9-482b-444a-8846-fac7caec14ee';
  const startPoint = new Position(2, 24);
  const endPoint = new Position(3, 28);
  const availableUberId = '319e4163-3152-40c0-bcc1-1800fe707082';

  beforeEach(async () => {
    await resetDB(sqlConnection);
    sqlBookingRepository = new SqlBookingRepository(sqlConnection);
  });

  afterAll(async () => {
    await sqlConnection.destroy();
  });

  it('should insert a booking successfully', async () => {
    await sqlConnection('ubers').insert([
      {
        id: 'f80ca10c-59cc-4cdb-a580-8b0e8ccd98d4',
      },
    ]);
    await transactionsPerformer.perform((trx) =>
      sqlBookingRepository.save(
        new Booking(
          '86381977-7922-4943-9336-ca3e0db7eb60',
          newBookingId,
          startPoint,
          endPoint,
          availableUberId,
          50,
        ),
      )(trx),
    );
    const bookings = await sqlConnection.select().table('bookings').select();
    expect(bookings).toEqual([
      {
        customer_id: '86381977-7922-4943-9336-ca3e0db7eb60',
        end_lat: 3,
        end_lon: 28,
        id: '7de9f5d9-482b-444a-8846-fac7caec14ee',
        price: 50,
        start_lat: 2,
        start_lon: 24,
        uber_id: '319e4163-3152-40c0-bcc1-1800fe707082',
      },
    ]);
  });

  it('should retrieve bookings from a given customer', async () => {
    await sqlConnection('bookings').insert({
      customer_id: '86381977-7922-4943-9336-ca3e0db7eb60',
      end_lat: 3,
      end_lon: 28,
      id: '7de9f5d9-482b-444a-8846-fac7caec14ee',
      price: 50,
      start_lat: 2,
      start_lon: 24,
      uber_id: '319e4163-3152-40c0-bcc1-1800fe707082',
    });
    const bookings: Booking[] = await sqlBookingRepository.byCustomerId(
      '86381977-7922-4943-9336-ca3e0db7eb60',
    );
    expect(bookings).toEqual([
      new Booking(
        '86381977-7922-4943-9336-ca3e0db7eb60',
        newBookingId,
        startPoint,
        endPoint,
        availableUberId,
        50,
      ),
    ]);
  });
});
