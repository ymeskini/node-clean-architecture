import { z } from 'zod';

const schema = z.object({
  PORT: z.string().pipe(z.coerce.number()).default('3001'),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  IN_MEMORY: z
    .string()
    .transform((val) => JSON.parse(val))
    .pipe(z.coerce.boolean())
    .default('false'),
});

export const env = schema.parse(process.env);
