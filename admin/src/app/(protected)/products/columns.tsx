"use client";
import { User, Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "@/utils/icons";
import Modal from "@/components/molecules/Modal";
import React from "react";
import { ITableColumn } from "@/utils/types";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export const PRODUCT_COLUMNS: ITableColumn[] = [
  {
    key: "firstname",
    label: "Name",
    isSortable: true,
    isSearchable: true
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const renderCell = (user: User, columnKey: React.Key) => {
  const cellValue = user[columnKey as keyof object];

  switch (columnKey) {
    case "firstname":
      return (
        <User
          avatarProps={{
            radius: "full",
            className: "",
            // src: user.,
            showFallback: true,
            fallback: (
              <span className="material-symbols-rounded text-default-500">
                person
              </span>
            ),
          }}
          description={user.email}
          name={user.firstname + " " + user.lastname}
        >
          {user.email}
        </User>
      );
    case "lastSeen":
      return <span>{new Date(cellValue).toLocaleDateString()}</span>;
    case "actions":
      return (
        <div className="relative flex items-center gap-4">
          <Tooltip content="Details">
            <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Edit user">
            <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="cursor-pointer text-lg text-danger active:opacity-50">
              <Modal
                body={<>Are you sure you want to delete it</>}
                onSuccess={() => {
                  console.log(
                    "deleting user of id: " + user["firstName" as keyof object]
                  );
                }}
                successButton="Delete"
              >
                <DeleteIcon />
              </Modal>
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
