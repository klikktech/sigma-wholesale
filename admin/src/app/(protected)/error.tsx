"use client";

import Button from "@/components/atoms/Button";
import { sessionExpiredAction } from "@/app/(auth-pages)/actions";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface ErrorCause {
  code: string;
  message: string;
}

interface CustomError extends Error {
  digest?: string;
  cause?: ErrorCause | string;
}

export default function Error({
  error,
  reset,
}: {
  error: CustomError;
  reset: () => void;
}) {
  const isUnauthorized = () => {
    if (typeof error.cause === 'object' && error.cause !== null) {
      return (error.cause as ErrorCause).code === 'Unauthorised';
    }
    return error.message === 'UNAUTHORIZED' || 
           error.digest === '214727410';
  };

  return (
    <div>
      <Modal
        backdrop="blur"
        isOpen={true}
        closeButton={<div className="hidden"></div>}
      >
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <div className="flex gap-2">
              <span className="material-symbols-rounded">error</span>
              <span>
                {isUnauthorized() ? (
                  'Your session has expired. Please log in again.'
                ) : (
                  'Something went wrong!'
                )}
              </span>
            </div>
          </ModalBody>
          <ModalFooter>
            {isUnauthorized() ? (
              <form action={sessionExpiredAction}>
                <Button type="submit">Login Again</Button>
              </form>
            ) : (
              <Button onClick={() => reset()}>Try again</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
