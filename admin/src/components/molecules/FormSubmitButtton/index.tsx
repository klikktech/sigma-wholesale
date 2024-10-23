"use client";

import Button from "@/components/atoms/Button";
import { ButtonProps } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import FormMessage from "../FormMessage";
import { Message } from "@/utils/types";

interface Props extends ButtonProps {
  pendingText?: string;
  errorMessage?: Message;
}

const FormSubmitButton = ({ pendingText = "Loading", ...props }: Props) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-3">
      <Button disabled={pending} type="submit" {...props}>
        {pending ? pendingText : "Sign Up"}
      </Button>
      {props.errorMessage && !pending && (
        <FormMessage message={props.errorMessage} />
      )}
    </div>
  );
};

export default FormSubmitButton;
