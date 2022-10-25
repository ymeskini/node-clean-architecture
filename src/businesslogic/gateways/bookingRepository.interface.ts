import {Booking} from "../models/booking";
import {GenericTransaction} from "./transactionPerformer.interface";

export interface BookingRepository {

    save(booking: Booking): (trx: GenericTransaction) => Promise<void>;

    byCustomerId(customerId: string): Promise<Booking[]>;
}