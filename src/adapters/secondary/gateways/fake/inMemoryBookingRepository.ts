import { BookingModel } from '../../../../businesslogic/models/booking';
import { BookingRepository } from '../../../../businesslogic/gateways/bookingRepository.interface';

export class InMemoryBookingRepository implements BookingRepository {
  private _bookings: BookingModel[] = [];

  byCustomerId(customerId: string): Promise<BookingModel[]> {
    return Promise.resolve(
      this._bookings.filter((booking) => booking.fromCustomerId(customerId)),
    );
  }

  save(booking: BookingModel): Promise<void> {
    this._bookings.push(booking);
    return Promise.resolve();
  }

  feedWithBookings(...bookings: BookingModel[]) {
    for (const booking of bookings) {
      this._bookings.push(booking);
    }
  }

  bookings() {
    return this._bookings;
  }
}
