"use client"
import { Input, Spacer } from "@nextui-org/react";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import FormMessage from "@/components/molecules/FormMessage";
import { forgotPasswordConfirmAction } from "@/app/(auth)/forgot-password/action";

const ConfirmForgotPassword = () => {
    const [state, formAction] = useFormState(forgotPasswordConfirmAction, undefined);
    const { pending } = useFormStatus();
    return (
        <div>
            <form action={formAction} className="flex flex-col w-full max-w-md" style={{ maxWidth: '500rem' }}>
                <Input
                    label="Enter code"
                    labelPlacement="outside"
                    type="text"
                    name="token"
                    placeholder="Enter the code you received"
                    required
                />
                <Spacer y={5} />
                <Input
                    label="Enter new password"
                    labelPlacement="outside"
                    type="password"
                    name="newPassword"
                    placeholder="Enter your new password"
                    required
                />
                <Spacer y={5} />
                <Input
                    label="Confirm password"
                    labelPlacement="outside"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    required
                />
                <Spacer y={5} />
                <p className="text-red-500 text-left">{state && <FormMessage message={state} />}</p>
                <FormSubmitButton className="mb-10 hover:bg-primary-600" disabled={pending} type="submit" color="primary" size="lg" pendingText="Submitting...">
                    submit
                </FormSubmitButton>
            </form>
        </div>
    )
}

export default ConfirmForgotPassword;