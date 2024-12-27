"use client";

import Button from "@/components/atoms/Button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error)
  }, [error])

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
                Something went wrong!
              </span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => reset()}>Try again</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
