import { Button, Card } from "@nextui-org/react";
import React from "react";

interface AddressProps {
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  isDefault?: boolean;
}

const AddressCard = ({
  name,
  street,
  city,
  state,
  country,
  postalCode,
  phone,
  isDefault = false,
}:AddressProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">{name}</h3>
        {/* {isDefault && <span className="text-sm text-blue-500">Default</span>} */}
      </div>
      <p className="text-gray-600">
        {street}, {city}, {state},
      </p>
      <p className="text-gray-600">
        {country} - {postalCode}
      </p>
      <p className="text-gray-600">Phone: {phone}</p>
      <div className="flex justify-between items-center mt-4">
      <p className="text-lg flex items-center text-blue-500 ">
        <span className="material-symbols-rounded text-lg text-blue-500">edit</span>
        <span className="hover:underline cursor-pointer">Edit Address</span></p>
        {/* <button className="text-blue-500 hover:underline">
          Choose another address
        </button> */}
      </div>
    </Card>
  );
};

export default AddressCard;
