'use client'
import logo from "../../../assets/sigma-logo.png"
import Image from "next/image";
import React, { useState } from "react";
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { handleVerification } from "./ageverification";

const AgeVerification = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleNoClick = () => {
        setErrorMessage("You are not old enough to view this content");
    };

    return (
        <>
            <Modal
                backdrop="opaque"
                isOpen={true}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    <>
                        <ModalBody className="flex items-center justify-center">
                            <Image className="mt-3" width={300} src={logo} alt={"logo"} />
                            <h2>Are you over 21 years of age?</h2>
                            {errorMessage && (
                                <p className="text-danger text-center mt-2">{errorMessage}</p>
                            )}
                        </ModalBody>
                        <ModalFooter className="flex items-center justify-center">
                            <Button color="danger" variant="light" onClick={handleNoClick}>
                                No
                            </Button>
                            <form>
                                <Button color="primary" type="submit" formAction={handleVerification}>
                                    Yes
                                </Button>
                            </form>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AgeVerification;
