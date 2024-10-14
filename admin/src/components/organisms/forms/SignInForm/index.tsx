"use client";
import React from "react";
import { signInAction } from "@/app/(auth-pages)/actions";
import Input from "@/components/atoms/Input";
import FormMessage from "@/components/molecules/FormMessage";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/atoms/Button";

const SignInForm = () => {
  const [state, formAction] = useFormState(signInAction, undefined);
  const { pending } = useFormStatus();

  return (
    <form
      className="flex-1 flex flex-col h-full min-w-64 w-full"
      action={formAction}
    >
      <div className="flex flex-col justify-between min-h-[500px] h-full">
        <div className="flex flex-col gap-4 [&>input]:mb-3 mt-8">
          {/* <h2 className="text-2xl font-semibold text-center">
            Sign In to your Account
          </h2> 
          <p className="my-6 text-content4-foreground text-center">
            Enter your email and password
          </p> */}
          <div>
            <Input
              size="lg"
              type="text"
              name="email"
              placeholder="Email"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 mr-2 material-symbols-rounded">
                    mail
                  </span>
                </div>
              }
              required
            />
          </div>
          <div>
            <Input
              size="lg"
              type="password"
              name="password"
              placeholder="Password"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 mr-2 material-symbols-rounded">
                    key
                  </span>
                </div>
              }
              required
            />
          </div>
          <Button
            type="submit"
            disabled={pending}
            aria-disabled={pending}
            className="mt-6"
          >
            {pending ? "Signing in..." : "Sign in"}
          </Button>
          {state && <FormMessage message={state} />}
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
