import { z } from 'zod';
import { Position, positionSchema } from './position';

export const bookingSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  uberId: z.string().uuid(),
  startPoint: positionSchema,
  endPoint: positionSchema,
  price: z.number(),
});

export type Booking = z.infer<typeof bookingSchema>;

export class BookingModel {
  constructor(
    readonly id: string,
    readonly customerId: string,
    readonly uberId: string,
    readonly price: number,
    readonly startPoint: Position,
    readonly endPoint: Position,
  ) {}

  fromCustomerId(customerId: string) {
    return this.customerId === customerId;
  }
}
