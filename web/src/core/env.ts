import { z } from "zod";

const schema = z.object({
  FRONT_END_URL: z.string().url(),
});

export const environment = schema.parse({
  FRONT_END_URL: process.env.NEXT_PUBLIC_FRONT_END_URL,
});

