import UserModel from "@/core/models/user";
import connectMongo from "@/lib/db";
import { FormState, SignupFormSchema } from "@/lib/definition";
import bcrypt from "bcrypt";

export default async function signup(state: FormState | undefined, formData?: FormData) {
  if (!formData) {
    return {
      success: false,
      errors: { general: ["Invalid form submission"], username: [], email: [], password: [], confirmPassword: [] },
    };
  }

  await connectMongo();

  const validateFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validateFields.success) {
    const { fieldErrors, formErrors } = validateFields.error.flatten();
    return {
      success: false,
      errors: {
        general: formErrors,
        username: fieldErrors.username || [],
        email: fieldErrors.email || [],
        password: fieldErrors.password || [],
        confirmPassword: fieldErrors.confirmPassword || [],
      },
    };
  }

  const { username, email, password } = validateFields.data;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        errors: {
          general: [],
          username: [],
          email: ["Email already exists"],
          password: [],
          confirmPassword: [],
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      user: { id: user._id, username, email },
    };
  } catch (error) {
    console.error("Signup Error:", error);
    return {
      success: false,
      errors: {
        general: ["An error occurred. Please try again."],
        username: [],
        email: [],
        password: [],
        confirmPassword: [],
      },
    };
  }
}
