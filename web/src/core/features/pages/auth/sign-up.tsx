import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, User } from "lucide-react";

export default function SignUp() {
  return (
    <div>
      <h1>Sign Up</h1>
      <Form >
        <FormField name="username" render={() => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <div>
                <Input placeholder="Enter username" />
                <User />
              </div>
            </FormControl>
          </FormItem>
        )} />

        <FormField name="email" render={() => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <div>
                <Input placeholder="Enter Email" />
                <Mail />
              </div>
            </FormControl>
          </FormItem>
        )} />

        <FormField name="password" render={() => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div>
                <Input placeholder="Enter Password" />

              </div>
            </FormControl>
          </FormItem>
        )} />

        <FormField name="confirm password" render={() => (
          <FormItem>
            <FormLabel> Confirm Password</FormLabel>
            <FormControl>
              <div>
                <Input placeholder="Confirm Password" />

              </div>
            </FormControl>
          </FormItem>
        )} />

        <Button type="submit">Create Account</Button>
      </Form>
      <p>Already have an Account &ques; Login</p>
    </div>
  )
}