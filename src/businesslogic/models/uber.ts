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
    readonly id: string,
    readonly startPoint: Position,
    readonly endPoint: Position,
  ) {}
}
