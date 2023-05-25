import { z } from 'zod';

export const positionSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export type PositionType = z.infer<typeof positionSchema>;

export class Position {
  constructor(readonly lat: number, readonly lon: number) {}

  compare(position: Position) {
    return this.lat === position.lat && this.lon === position.lon;
  }
}
