import { PositionType } from '../models/position';

export interface BookingUberCommand {
  customerId: string;
  bookingId: string;
  startPoint: PositionType;
  endPoint: PositionType;
}
