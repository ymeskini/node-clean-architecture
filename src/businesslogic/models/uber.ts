import { z } from 'zod';
import { Position, positionSchema } from './position';

const uberSchema = z.object({
  id: z.string(),
  startPoint: positionSchema,
  endPoint: positionSchema,
});

export type Uber = z.infer<typeof uberSchema>;

export class UberModel {
  constructor(
    private _id: string,
    private _startPoint: Position,
    private _endPoint: Position,
  ) {}
}
