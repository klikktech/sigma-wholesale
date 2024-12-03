import AddressCard from "@/components/molecules/Addresscard";
import { Card, Radio } from "@nextui-org/react";
import React from "react";

interface MyAddressListProps {
    addresses: any[];
    onSelect: (addressId: string) => void;
}

const MyAddressList = ({ addresses, onSelect }: MyAddressListProps) => {
    return (
        <div className="w-full">
            {addresses.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold">Shipping Addresses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-4">
                        {addresses.map((address) => (
                            <Radio className="w-full" key={address.id} value={address.id.toString()}>
                                <AddressCard key={address.id} {...address} />
                            </Radio>
                        ))}
                    </div>
                </>
            )}
            <Radio value="new">Add New Address</Radio>
        </div>
    );
};

export default MyAddressList;
