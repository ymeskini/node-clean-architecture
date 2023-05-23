import { BookingRepository } from "../gateways/bookingRepository.interface";

export class RetrieveCustomerBookingsHistory {
  constructor(private bookingRepository: BookingRepository) {}

  async retrieve(customerId: string) {
    return this.bookingRepository.byCustomerId(customerId);
  }
}
