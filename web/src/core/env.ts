import { z } from "zod";

const schema = z.object({
  FRONT_END_URL: z.string().url(),
});

const parsed = schema.parse({
  FRONT_END_URL: process.env.NEXT_PUBLIC_FRONT_END_URL,
});

export const FRONT_END_URL = parsed.FRONT_END_URL;
