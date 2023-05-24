import { z } from 'zod';

export const positionSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export class Position {
  constructor(private _lat: number, private _lon: number) {}

  get lat(): number {
    return this._lat;
  }

  get lon(): number {
    return this._lon;
  }
}
