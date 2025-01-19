import connectMongo from "@/lib/db";
import { FormState, SignupFormSchema } from "@/lib/definition";

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

  const {username, email, password} = validateFields.data;
  const hashedPassword = await 
}
