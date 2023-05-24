import { z } from 'zod';
import { Position, positionSchema } from './position';

export const bookingSchema = z.object({
  customerId: z.string(),
  id: z.string(),
  startPoint: positionSchema,
  endPoint: positionSchema,
  uberId: z.string().optional(),
  price: z.number(),
});

export type Booking = z.infer<typeof bookingSchema>;

export class BookingModel {
  constructor(
    private _customerId: string,
    private _id: string,
    private _startPoint: Position,
    private _endPoint: Position,
    private _uberId: string | undefined,
    private _price: number,
  ) {}

  fromCustomerId(customerId: string) {
    return this._customerId === customerId;
  }

  get customerId(): string {
    return this._customerId;
  }

  get id(): string {
    return this._id;
  }

  get startPoint(): Position {
    return this._startPoint;
  }

  get endPoint(): Position {
    return this._endPoint;
  }

  get uberId() {
    return this._uberId;
  }

  get price(): number {
    return this._price;
  }
}
