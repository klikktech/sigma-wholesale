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

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <>
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
                  {error.digest?.includes('UNAUTHORIZED') || error.message?.includes("Unauthorised") ? (
                    'Your session has expired.'
                  ) : (
                    'Something went wrong!'
                  )}
                </span>
              </div>
            </ModalBody>
            <ModalFooter>
              {error.digest?.includes('UNAUTHORIZED') || error.message?.includes("Unauthorised") ? (
                <form action={sessionExpiredAction}>
                  <Button type="submit">Retry</Button>
                </form>
              ) : (
                <Button onClick={() => reset()}>Try again</Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}
