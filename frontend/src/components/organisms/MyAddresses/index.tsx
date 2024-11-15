import AddressCard from "@/components/molecules/Addresscard";
import { Card, Radio } from "@nextui-org/react";
import React from "react";

interface MyAddressListProps {
  addresses: any[];
  onSelect: (addressId: string) => void;
}

const MyAddressList = ({ addresses, onSelect }: MyAddressListProps) => {
    return (
        <div className="flex flex-col gap-3">
          <Radio value="new">Add New Address</Radio>
            {addresses.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold">Shipping Addresses</h3>
                    {addresses.map((address) => (
                        <Radio key={address.id} value={address.id.toString()}>
                            <AddressCard key={address.id} {...address} />
                        </Radio>
                    ))}
                </>
            )}
        </div>
    );
};

export default MyAddressList;
