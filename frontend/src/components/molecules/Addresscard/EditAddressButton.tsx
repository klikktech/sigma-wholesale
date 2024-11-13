'use client';

import { useDisclosure } from "@nextui-org/react";
import { EditAddressModal } from "./EditAddressModal";
import { updateAddress } from "./actions";
import { AddressProps } from "@/utils/types";

interface EditAddressButtonProps {
  address: AddressProps;
}

export const EditAddressButton = ({ address }: EditAddressButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdate = async (updatedAddress: AddressProps) => {
    try {
      await updateAddress(updatedAddress);
      onClose();
    } catch (error) {
      console.error('Failed to update address:', error);
    }
  };

  return (
    <>
      <p className="text-lg flex items-center text-blue-500" onClick={onOpen}>
        <span className="material-symbols-rounded text-lg text-blue-500">edit</span>
        <span className="hover:underline cursor-pointer">Edit Address</span>
      </p>

      <EditAddressModal
        isOpen={isOpen}
        onClose={onClose}
        address={address}
        onUpdate={handleUpdate}
      />
    </>
  );
}; 