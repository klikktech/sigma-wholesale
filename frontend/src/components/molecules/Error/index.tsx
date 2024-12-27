"use client";

import { sessionExpiredAction } from "@/app/(auth)/login/action";
import { Button } from "@nextui-org/react";

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

export default function UnauthorizedError() {

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
                                Your session has expired. Please log in again.
                            </span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <form action={sessionExpiredAction}>
                            <Button type="submit">Login Again</Button>
                        </form>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
