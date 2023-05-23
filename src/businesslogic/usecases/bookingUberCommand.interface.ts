import { Position } from '../models/position';

export interface BookingUberCommand {
  customerId: string;
  bookingId: string;
  startPoint: Position;
  endPoint: Position;
}
