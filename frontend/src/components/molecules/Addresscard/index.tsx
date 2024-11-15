import { Card, Chip } from "@nextui-org/react";
import { EditAddressButton } from "./EditAddressButton";
import { AddressProps } from "@/utils/types";

const AddressCard = (props: AddressProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">{props.firstName} {props.lastName}</h3>
        {/* {props.isDefault && <Chip
          className="capitalize"
          color="success"
          size="sm"
          variant="flat"
        >
          Primary
        </Chip>} */}
      </div>
      <p className="text-gray-600">
        {props.address}, {props.city}, {props.state},
      </p>
      <p className="text-gray-600">
        {props.zipcode}
      </p>
      <p className="text-gray-600">Phone: {props.phone}</p>
      <div className="flex justify-between items-center mt-4">
        {/* <EditAddressButton address={props} /> */}
      </div>
    </Card>
  );
};

export default AddressCard;
