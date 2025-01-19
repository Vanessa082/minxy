import signup from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

export default function SignUp() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div>
      <h1>Sign Up</h1>
      <form action={action}>
        <div>
          <label htmlFor="username">Username</label>
          <Input id="username" name="username" placeholder="username" />
        </div>
        {state?.errors?.username && <p>{state?.errors?.username.join(", ")}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <Input id="email" name="email" type="email" placeholder="Email" />
        </div>
        {state?.errors?.email && <p>{state?.errors?.email.join(", ")}</p>}
        <div>
          <label htmlFor="password">Password</label>
          <Input id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="confirmPassword"
          />
        </div>
        {state?.errors?.confirmPassword && (
          <p>{state.errors.confirmPassword.join(", ")}</p>
        )}
        <Button disabled={pending} type="submit">
          Sign Up
        </Button>
      </form>
      <p>Already have an Account &ques; Login</p>
    </div>
  );
}
