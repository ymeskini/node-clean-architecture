import { BookingModel } from '../models/booking';

export interface BookingRepository {
  save(booking: BookingModel): Promise<void>;
  byCustomerId(customerId: string): Promise<BookingModel[]>;
}
