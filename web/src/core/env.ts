// import { z } from "zod";

// const clerkEnvSchema = z.object({
//   publishableKey: z.string(),
//   sessionSecret: z.string(),
//   clerkSecretKey: z.string(),
//   signInUrl: z.string(),
//   signUpUrl: z.string(),
//   signInFallbackRedirectUrl: z.string(),
//   signUpForceRedirectUrl: z.string(),
// });

// const envSchema = z.object({
//   frontEndUrl: z.string().url(),
//   mongoDbUrl: z.string(),
//   isProduction: z.boolean().default(false),
//   clerk: clerkEnvSchema,
// });

export const environment = {
  frontEndUrl:
    process.env.FRONT_END_URL || process.env.NEXT_PUBLIC_FRONT_END_URL,
  mongoDbUrl: process.env.MONGO_URI,
  isProduction: process.env.NODE_ENV === "production",
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    sessionSecret: process.env.SESSION_SECRET,

    clerkSecretKey: process.env.CLERK_SECRET_KEY,
    signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    signInFallbackRedirectUrl:
      process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
    signUpForceRedirectUrl:
      process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
  },
};
