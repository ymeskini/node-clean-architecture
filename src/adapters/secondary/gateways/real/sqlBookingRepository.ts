import { BookingRepository } from '../../../../businesslogic/gateways/bookingRepository.interface';
import { Knex } from 'knex';
import { Booking } from '../../../../businesslogic/models/booking';
import { GenericTransaction } from '../../../../businesslogic/gateways/transactionPerformer.interface';
import { Position } from '../../../../businesslogic/models/position';

export class SqlBookingRepository implements BookingRepository {
  private sqlConnection: Knex;
  constructor(sqlConnection: Knex) {
    this.sqlConnection = sqlConnection;
  }

  async byCustomerId(customerId: string): Promise<Booking[]> {
    const bookingRawResults = await this.sqlConnection('bookings')
      .select()
      .where({ customer_id: customerId });
    return bookingRawResults.map((bookingRawResult) => {
      return new Booking(
        bookingRawResult['customer_id'],
        bookingRawResult['id'],
        new Position(
          bookingRawResult['start_lat'],
          bookingRawResult['start_lon'],
        ),
        new Position(bookingRawResult['end_lat'], bookingRawResult['end_lon']),
        bookingRawResult['uber_id'],
        bookingRawResult['price'],
      );
    });
  }

  save(booking: Booking): (trx: GenericTransaction) => Promise<void> {
    return async (trx) => {
      await this.sqlConnection('bookings')
        .transacting(trx as Knex.Transaction)
        .insert({
          id: booking.id,
          customer_id: booking.customerId,
          uber_id: booking.uberId,
          start_lat: booking.startPoint.lat,
          start_lon: booking.startPoint.lon,
          end_lat: booking.endPoint.lat,
          end_lon: booking.endPoint.lon,
          price: booking.price,
        });
    };
  }
}
