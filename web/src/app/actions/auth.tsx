import UserModel from "@/core/models/user";
import connectMongo from "@/lib/db";
import { FormState, SignupFormSchema } from "@/lib/definition";
import bcrypt from "bcrypt"

export default async function signup(state: FormState, formData: FormData) {
  await connectMongo();

  const validateFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validateFields.data;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return {
        errors: { email: ["Email already exist"] }
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    })
    return { success: true, user: { id: user._id, username, email } }
  } catch (error) {
    console.error("Signup Error:", error);
    return { errors: { general: ["An error occurred. Please try again."] } };
  }
}
