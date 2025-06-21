import { UrlStatus } from "@/server/models/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";

export const urlShortenerSchema = z.object({
  original: z
    .string({ required_error: "url is required" })
    .url({ message: "Invalid url" }),
});

export type URLShortenerInputField = z.infer<typeof urlShortenerSchema>;

export const URLShortenerInputFieldResolver = zodResolver(urlShortenerSchema);

export type URLShortenerRequestSchema = z.infer<
  typeof urlShortenerRequestSchema
>;

export const urlShortenerRequestSchema = urlShortenerSchema.extend({
  userId: z.string({ required_error: "id needed" }).nonempty(),
});

export const completeUrlRequestSchema = urlShortenerSchema.extend({
  name: string().min(4, { message: "Url name is required to be 4 characters and above" }),
  shortId: z.string({ required_error: "shortId is required" }).nonempty(),
  original: z
    .string().url({ message: "Invalid url" }),
  status: z.nativeEnum(UrlStatus),
  password: z
    .string()
    .min(8, { message: "Password has to be minimum 8 characters" })
    .max(12, { message: "Password  is too long " })
    .regex(/^(?=.*[A-Z]).{8,12}$/, {
      message: "Password must contain at least one uppercase letter",
    })
    .optional(),
  clicks: z.number().int().nonnegative().optional(),
}).partial()

export type CompleteUrlRequestSchema = z.infer<typeof completeUrlRequestSchema>;
export const completeUrlRequestSchemaResolver = zodResolver(completeUrlRequestSchema);

export const verifyUrlSchema = z.object({
  shortId: z.string().nonempty(),
  password: z.string().min(1, { message: "Password is required" }),
  original: z
    .string().url({ message: "Invalid url" }),
});

export type VerifyUrlInput = z.infer<typeof verifyUrlSchema>;
export const verifyUrlResolver = zodResolver(verifyUrlSchema);

export const verifyPasswordSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
});
export type VerifyPasswordInput = z.infer<typeof verifyPasswordSchema>;
export const verifyPasswordResolver = zodResolver(verifyPasswordSchema);

