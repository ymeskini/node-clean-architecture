import knex, { Knex } from 'knex';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from 'testcontainers';

import { SqlBookingRepository } from './sqlBookingRepository';
import { BookingModel } from '../../../../businesslogic/models/booking';
import { Position } from '../../../../businesslogic/models/position';
import { runMigration } from './knex/resetDb';
import { randomUUID } from 'crypto';

describe('Sql booking repository', () => {
  jest.setTimeout(60000);

  let sqlConnection: Knex;
  let sqlBookingRepository: SqlBookingRepository;
  let container: StartedPostgreSqlContainer;

  let newBookingId: string;
  const startPoint = new Position(2, 24);
  const endPoint = new Position(3, 28);
  const availableUberId = '319e4163-3152-40c0-bcc1-1800fe707082';

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    sqlConnection = knex({
      client: 'postgresql',
      connection: {
        database: container.getDatabase(),
        host: container.getHost(),
        password: container.getPassword(),
        port: container.getPort(),
        user: container.getUsername(),
      },
    });
    await runMigration(sqlConnection);
  }, 10000);

  beforeEach(async () => {
    newBookingId = randomUUID();
    sqlBookingRepository = new SqlBookingRepository(sqlConnection);
  });

  afterAll(async () => {
    await sqlConnection.destroy();
    await container.stop();
  });

  it('should insert a booking successfully', async () => {
    await sqlConnection('ubers').insert([
      {
        id: 'f80ca10c-59cc-4cdb-a580-8b0e8ccd98d4',
      },
    ]);
    await sqlBookingRepository.save(
      new BookingModel(
        newBookingId,
        '86381977-7922-4943-9336-ca3e0db7eb60',
        availableUberId,
        50,
        startPoint,
        endPoint,
      ),
    );
    const bookings = await sqlConnection.select().table('bookings').select();
    expect(bookings).toEqual([
      {
        id: newBookingId,
        customerId: '86381977-7922-4943-9336-ca3e0db7eb60',
        uberId: '319e4163-3152-40c0-bcc1-1800fe707082',
        endPoint: {
          lat: 3,
          lon: 28,
        },
        startPoint: {
          lat: 2,
          lon: 24,
        },
        price: 50,
      },
    ]);
  });

  it('should retrieve bookings from a given customer', async () => {
    const customerId = randomUUID();
    await sqlConnection('bookings').insert({
      id: newBookingId,
      uberId: '319e4163-3152-40c0-bcc1-1800fe707082',
      customerId: customerId,
      startPoint: {
        lat: 2,
        lon: 24,
      },
      endPoint: {
        lat: 3,
        lon: 28,
      },
      price: 50,
    });
    const bookings: BookingModel[] = await sqlBookingRepository.byCustomerId(
      customerId,
    );
    expect(bookings).toEqual([
      new BookingModel(
        newBookingId,
        customerId,
        availableUberId,
        50,
        startPoint,
        endPoint,
      ),
    ]);
  });
});
