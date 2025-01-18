import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, User } from "lucide-react";

export default function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <Form >
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
        <Button type="submit">Sign In</Button>
      </Form>
      <p>Do not have an Account &ques; SignUp</p>
    </div>
  )
}