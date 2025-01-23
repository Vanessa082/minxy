import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center py-4">
      <SignUp />
    </div>
  );
}
