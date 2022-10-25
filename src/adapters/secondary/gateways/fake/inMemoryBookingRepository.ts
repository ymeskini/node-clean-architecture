import {Booking} from "../../../../businesslogic/models/booking";
import {BookingRepository} from "../../../../businesslogic/gateways/bookingRepository.interface";
import {GenericTransaction} from "../../../../businesslogic/gateways/transactionPerformer.interface";

export class InMemoryBookingRepository implements BookingRepository {

    private _bookings: Booking[] = [];

    byCustomerId(customerId: string): Promise<Booking[]> {
        return Promise.resolve(this._bookings.filter(booking => booking.fromCustomerId(customerId)));
    }

    save(booking: Booking): (trx: GenericTransaction) => Promise<void> {
        return async trx => {
            this._bookings.push(booking);
            return;
        };
    }

    feedWithBookings(...bookings: Booking[]) {
        for (const booking of bookings) {
            this._bookings.push(booking);
        }
    }

    bookings() {
        return this._bookings;
    }


}