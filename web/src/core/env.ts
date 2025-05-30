import { z } from "zod";

const schema = z.object({
  frontEndUrl: z.string().url(),
});

export const environment = schema.parse({
  frontEndUrl: process.env.NEXT_PUBLIC_FRONT_END_URL,
});

