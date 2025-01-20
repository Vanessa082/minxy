import { z } from "zod";

export const SignupFormSchema = z
  .object({
    username: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .toLowerCase()
      .min(3, { message: "Username must be at least 3 characters long" }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be valid",
      })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(8, {
        message: "Confirm password must be at least 8 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type FormState = {
  success: boolean;
  errors: {
    general?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  user?: {
    id: string;
    username: string;
    email: string;
  };
};


