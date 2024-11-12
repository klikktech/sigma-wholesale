import AddressCard from "@/components/molecules/Addresscard";
import ShippingInfoCard from "@/components/molecules/ShippingInfocard";
import React from "react";

const MyAddressList = () => {
  const addressList = [
    {
      name: "Ainsley Aiken",
      street: "936 Kiehn Route, West Ned",
      city: "Tennessee",
      state: "",
      country: "France",
      postalCode: "11230",
      phone: "9743857881",
      isDefault: true,
    },
    {
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      country: "USA",
      postalCode: "10001",
      phone: "1234567890",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Address List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        {addressList.map((address, index) => (
          <AddressCard key={index} {...address} />
        ))}
      </div>
      <div className="">
        <ShippingInfoCard />
      </div>
      </div>
    </div>
  );
};

export default MyAddressList;
