"use client";
import { User, Tooltip, Link } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "@/utils/icons";
import Modal from "@/components/molecules/Modal";
import React from "react";
import { ITableColumn } from "@/utils/types";
import { EDIT_USER_PAGE_ROUTE } from "@/utils/routes";
import { deleteUser } from "./actions";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
}

export const USER_COLUMNS: ITableColumn[] = [
  {
    key: "username",
    label: "Name",
    isSortable: true,
    isSearchable: true
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "createdAt",
    label: "Joined us",
    isSortable: true
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const renderUserTableCell = (user: User, columnKey: React.Key) => {
  const cellValue = user[columnKey as keyof object];

  switch (columnKey) {
    case "username":
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
          name={user.username}
        >
          {user.email}
        </User>
      );
    case "createdAt":
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
          <Link href={EDIT_USER_PAGE_ROUTE(user.email)}>

            <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
              <EditIcon />
            </span>
            </Link>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="cursor-pointer text-lg text-danger active:opacity-50">
              <Modal
                body={<>Are you sure you want to delete it</>}
                onSuccess={async () => {
                  await deleteUser(user.email);
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
      return (cellValue as string).includes("null") ? <>-</> : cellValue;
  }
};
