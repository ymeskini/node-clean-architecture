import knexConfig from './knex/knexfile';
import knex from 'knex';
import { SqlBookingRepository } from './sqlBookingRepository';
import { BookingModel } from '../../../../businesslogic/models/booking';
import { Position } from '../../../../businesslogic/models/position';
import { resetDB } from './knex/resetDb';

const sqlConnection = knex(knexConfig.tests);

describe('Sql booking repository', () => {
  let sqlBookingRepository: SqlBookingRepository;

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
    await sqlBookingRepository.save(
      new BookingModel(
        '86381977-7922-4943-9336-ca3e0db7eb60',
        newBookingId,
        startPoint,
        endPoint,
        availableUberId,
        50,
      ),
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
      customerId: '86381977-7922-4943-9336-ca3e0db7eb60',
      startPoint: {
        lat: 2,
        lon: 24,
      },
      endPoint: {
        lat: 3,
        lon: 28,
      },
      id: '7de9f5d9-482b-444a-8846-fac7caec14ee',
      price: 50,
      uberId: '319e4163-3152-40c0-bcc1-1800fe707082',
    });
    const bookings: BookingModel[] = await sqlBookingRepository.byCustomerId(
      '86381977-7922-4943-9336-ca3e0db7eb60',
    );
    expect(bookings).toEqual([
      new BookingModel(
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
