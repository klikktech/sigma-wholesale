'use client';

import { AddressProps } from "@/utils/types";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button } from "@nextui-org/react";
import { useState } from "react";

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: AddressProps;
  onUpdate: (updatedAddress: AddressProps) => void;
}

export const EditAddressModal = ({ isOpen, onClose, address, onUpdate }: EditAddressModalProps) => {
  const [formData, setFormData] = useState<AddressProps>(address);

  const handleInputChange = (field: keyof AddressProps) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleUpdate = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="text-2xl font-bold">Edit Address</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
            />
            <Input
              label="Street"
              value={formData.address}
              onChange={handleInputChange('address')}
            />
            <Input
              label="City"
              value={formData.city}
              onChange={handleInputChange('city')}
            />
            <Input
              label="State"
              value={formData.state}
              onChange={handleInputChange('state')}
            />
            <Input
              label="Postal Code"
              value={formData.zipcode.toString()}
              onChange={handleInputChange('zipcode')}
            />
            <Input
              label="Phone"
              value={formData.phone}
              onChange={handleInputChange('phone')}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleUpdate}>
            Update Address
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}; 