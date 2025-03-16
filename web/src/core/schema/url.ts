import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const urlShortenerSchema = z.object({
  original: z
    .string({ required_error: "url is required" })
    .url({ message: "Invalid url" }),
});

export type URLShortenerInputField = z.infer<typeof urlShortenerSchema>;

export const URLShortenerInputFieldResolver = zodResolver(urlShortenerSchema);
