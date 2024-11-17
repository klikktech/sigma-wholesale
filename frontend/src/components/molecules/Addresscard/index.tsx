import { AddressProps } from "@/utils/types";
import { deleteAddressAction } from "./actions";
import { Card } from "@nextui-org/react";

const AddressCard = (props: AddressProps) => {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, address: string) => {
    e.preventDefault();
    console.log("address value:", address);
    const formData = new FormData();
    formData.append("address", address);
    console.log("formData after append:", formData.get("address"));
    await deleteAddressAction(formData);
  }
  return (
    <Card className="p-4 min-h-44 min-w-72 max-w-fit">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">{props.firstName} {props.lastName}</h3>
          <button
            onClick={(e) => handleDelete(e, props.address)}
          >
            <span className="material-symbols-rounded text-red-500 cursor-pointer">
              delete
            </span>
          </button>

      </div>
      <p className="text-gray-600">
        {props.address}, {props.city}, {props.state},
      </p>
      <p className="text-gray-600">
        {props.zipcode}
      </p>
      <p className="text-gray-600">Phone: {props.phone}</p>
      <div className="flex justify-between items-center mt-4">
      </div>
    </Card>
  );
};

export default AddressCard;
