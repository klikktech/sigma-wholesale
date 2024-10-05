"use client";

import { Input } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/atoms/Button";
import { authenticate } from "@/app/(auth)/login/action";

const Login = () => {
  const [state, formAction] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action={formAction}
        className="flex flex-col w-full gap-4"
        style={{ maxWidth: "600px" }}
      >
        <div className="flex flex-col gap-2">
          <Input
            label="Email *"
            name="email"
            type="text"
            placeholder="johndoe@example.com"
            labelPlacement="outside"
            required
            fullWidth
          />
          {state?.errors?.email && (
            <p className="text-danger">{state.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            label="Password *"
            name="password"
            type="password"
            placeholder="********"
            labelPlacement="outside"
            required
            fullWidth
          />
          {state?.errors?.password && (
            <div className="text-danger">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Button disabled={pending} type="submit" color="primary" size="lg">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
