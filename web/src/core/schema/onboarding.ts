import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const onboardingFormSchema = z.object({
  clerkId: z.string(),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
});

export type OnboardingPageForm = z.infer<typeof onboardingFormSchema>;

export const onboardingPageFormResolver = zodResolver(onboardingFormSchema);
