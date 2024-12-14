"use client";

import { signInAction } from "@/app/(auth-pages)/actions";
import Input from "@/components/atoms/Input";
import FormMessage from "@/components/molecules/FormMessage";
import FormSubmitButton from "@/components/molecules/FormSubmitButtton";
import { Spacer } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
const SignInForm = () => {
  const [state, formAction] = useFormState(signInAction, undefined);
  const { pending } = useFormStatus();

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
        <p className="text-red-500 text-left">{state && <FormMessage message={state} />}</p>
        <Spacer y={3} />
        <FormSubmitButton className="mb-10" disabled={pending} type="submit" color="primary" size="lg" pendingText="Logging in...">
          Login
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default SignInForm;
