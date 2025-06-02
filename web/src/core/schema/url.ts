import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const urlShortenerSchema = z.object({
  original: z
    .string({ required_error: "url is required" })
    .url({ message: "Invalid url" }),
});

export const urlShortenerDtoSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password has to be minimum 8 characters" })
    .max(12, { message: "Password  is too long " })
    .regex(/^(?=.*[A-Z].{8,})$/, {
      message: "Password has to contain at least one uppercase letter",
    }),
  status: z.enum(["active", "inactive"]),
});

export type URLShortenerInputField = z.infer<typeof urlShortenerSchema>;

export type URLShortenerDto = z.infer<typeof urlShortenerDtoSchema>;

export const URLShortenerInputFieldResolver = zodResolver(urlShortenerSchema);

export const urlShortenerRequestSchema = urlShortenerSchema.extend({
  userId: z.string({ required_error: "id needed" }).nonempty(),
});

export type URLShortenerRequestSchema = z.infer<
  typeof urlShortenerRequestSchema
>;
