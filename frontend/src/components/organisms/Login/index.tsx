"use client";

import { Button, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { forgotPasswordAction, signInAction } from "@/app/(auth)/login/action";
import { FORGOT_PASSWORD_PAGE_ROUTE, SIGNUP_PAGE_ROUTE } from "@/utils/urls";
import FormMessage from "@/components/molecules/FormMessage";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { useRouter } from "next/navigation";


const Login = () => {
  const [state, formAction] = useFormState(signInAction, undefined);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  const handleForgotPassword = async () => {
    const result = await forgotPasswordAction(verificationEmail);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(result?.success);
      setIsModalOpen(false);
      router.push(FORGOT_PASSWORD_PAGE_ROUTE);
    }
  }

  return (
    <div className="flex justify-center items-center">
      <form action={formAction} className="flex flex-col w-full max-w-md" style={{ maxWidth: '500rem' }}>

        <Input
          label="Email*"
          name="email"
          type="text"
          placeholder="johndoe@example.com"
          labelPlacement="outside"
          required
          fullWidth
        />

        <Spacer y={5} />

        <Input
          label="Password*"
          name="password"
          type="password"
          placeholder="********"
          labelPlacement="outside"
          required
          fullWidth
        />

        <Spacer y={5} />

        <div className="flex justify-between items-center">
          <div className="text-sm">
            Don&apos;t have an account?&nbsp;

            <Link
              className="text-primary font-medium underline"
              href={SIGNUP_PAGE_ROUTE}
            >
              Sign up
            </Link>
          </div>
          <div className="text-primary font-medium underline cursor-pointer" onClick={() => setIsModalOpen(true)}>
            Forgot password?
          </div>
        </div>

        <Spacer y={3} />
        <p className="text-red-500 text-left">{state && <FormMessage message={state} />}</p>
        <Spacer y={3} />
        <FormSubmitButton className="mb-10 hover:bg-primary-600" disabled={pending} type="submit" color="primary" size="lg" pendingText="Logging in...">
          Login
        </FormSubmitButton>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        placement="center"
        className="mx-4 sm:mx-0"
        scrollBehavior="inside"
      >
        <ModalContent className="max-h-[90vh] sm:max-h-[80vh]">
          {(onClose) => (
            <>
              <ModalHeader className="px-4 sm:px-6">
                <h3 >Forgot Password</h3>
              </ModalHeader>
              <ModalBody className="px-4 sm:px-6">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    Enter your email address and we will send you a code to reset your password.
                  </p>
                </div>
                <form onSubmit={handleForgotPassword}>
                  <div className="space-y-4">
                    <div className="mb-4">
                      <Input
                        label="Email"
                        name="verificationEmail"
                        labelPlacement="outside"
                        placeholder="Enter your email"
                        type="email"
                        required
                        value={verificationEmail}
                        onChange={(e) => setVerificationEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="px-4 sm:px-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleForgotPassword}
                  className="w-full sm:w-auto order-1 sm:order-2 text-black"
                  isDisabled={!verificationEmail}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;