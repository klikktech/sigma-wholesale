"use client";

import { Input, Link, Spacer } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/atoms/Button";
import { signInAction } from "@/app/(auth)/login/action";
import { HOME_PAGE_ROUTE, SIGNUP_PAGE_ROUTE } from "@/utils/urls";
import FormMessage from "@/components/molecules/FormMessage";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Login = () => {
  const [state, formAction] = useFormState(signInAction, undefined);
  const { pending } = useFormStatus();

  useEffect(() => {
    console.log("state", state)
    if (state?.error) {
      console.log("state.error", state.error)
      toast.error(state.error);
    }
    if (state?.success) {
      console.log("state.success", state.success)
      toast.success(state.success);
      window.location.href = HOME_PAGE_ROUTE;
    }
  }, [state?.error, state?.success]);

  return (
    <div className="flex justify-center items-center">
        <form action={formAction} className="flex flex-col w-full max-w-md" style={{ maxWidth: '500rem' }}>
        
        <Input
          label="Email *"
          name="email"
          type="text"
          placeholder="johndoe@example.com"
          labelPlacement="outside"
          required
          fullWidth
        />

        <Spacer y={5} />

        <Input
          label="Password *"
          name="password"
          type="password"
          placeholder="********"
          labelPlacement="outside"
          required
          fullWidth
        />

        <Spacer y={5} />

        <div className="text-left">
            <p className="text-sm">
              Don&apos;t have an account?&nbsp;

            <Link
              className="text-primary font-medium underline"
              href={SIGNUP_PAGE_ROUTE}
            >
              Sign up
            </Link>
            </p>
        </div>

        <Spacer y={3} />
        <p className="text-red-500 text-left">{state && <FormMessage message={state} />}</p>
        <Spacer y={3} />
        <Button className="mb-10" disabled={pending} type="submit" color="primary" size="lg">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;