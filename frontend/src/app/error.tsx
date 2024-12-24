"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { sessionExpiredAction } from "./(auth)/login/action";

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
                  {error.message}
                  {error.message.includes("Unauthorised") ? (
                    <> Your session has expired.</>
                  ) : (
                    <>Something went wrong!</>
                  )}
                </span>
              </div>
            </ModalBody>
            <ModalFooter>
              {error.message.includes("Unauthorised") ? (
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
