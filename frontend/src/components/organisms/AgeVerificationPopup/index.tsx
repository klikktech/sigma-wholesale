import logo from "../../../assets/sigma-logo.png"
import Image from "next/image";
import React from "react";
import { setAgeVerification } from "@/lib/axios/session";
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from "@nextui-org/react";


const handleVerification = async () => {
    'use server'
    console.log("handle verification")
    await setAgeVerification()
};

const AgeVerification = () => {
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
                        </ModalBody>
                        <ModalFooter className="flex items-center justify-center">
                            <Button color="danger" variant="light">
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
