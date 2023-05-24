import { BookingRepository } from '../../../../businesslogic/gateways/bookingRepository.interface';
import { Knex } from 'knex';
import { BookingModel } from '../../../../businesslogic/models/booking';
import { Position } from '../../../../businesslogic/models/position';

export class SqlBookingRepository implements BookingRepository {
  private sqlConnection: Knex;
  constructor(sqlConnection: Knex) {
    this.sqlConnection = sqlConnection;
  }

  async byCustomerId(customerId: string): Promise<BookingModel[]> {
    const bookingRawResults = await this.sqlConnection('bookings')
      .select()
      .where({ customerId });
    return bookingRawResults.map((bookingRawResult) => {
      return new BookingModel(
        bookingRawResult.customerId,
        bookingRawResult.id,
        new Position(
          bookingRawResult.startPoint.lat,
          bookingRawResult.startPoint.lon,
        ),
        new Position(
          bookingRawResult.endPoint.lat,
          bookingRawResult.endPoint.lon,
        ),
        bookingRawResult.uberId,
        bookingRawResult.price,
      );
    });
  }

  async save(booking: BookingModel): Promise<void> {
    await this.sqlConnection('bookings').insert({
      id: booking.id,
      customerId: booking.customerId,
      uberId: booking.uberId,
      startPoint: {
        lat: booking.startPoint.lat,
        lon: booking.startPoint.lon,
      },
      endPoint: {
        lat: booking.endPoint.lat,
        lon: booking.endPoint.lon,
      },
      price: booking.price,
    });
  }
}
