import { Position } from './position';

export class Booking {
  constructor(
    private _customerId: string,
    private _id: string,
    private _startPoint: Position,
    private _endPoint: Position,
    private _uberId: string,
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

  get uberId(): string {
    return this._uberId;
  }

  get price(): number {
    return this._price;
  }
}
