"use client";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "@/utils/icons";
import Modal from "@/components/molecules/Modal";
import React from "react";
import { ITableColumn } from "@/utils/types";
import Link from "next/link";
import { EDIT_PRODUCT_PAGE_ROUTE } from "@/utils/routes";
import { deleteProduct } from './actions';

interface Product {
  id: string;
  name: string;
  sku: string;
  displayImage: any;
  details: string;
  price: string;
  status: string;
  createdAt: string;
}

export const PRODUCT_COLUMNS: ITableColumn[] = [
  {
    key: "name",
    label: "Name",
    isSortable: true,
    isSearchable: true,
  },
  {
    key: "sku",
    label: "Sku",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "status",
    label: "Stock",
    isSortable: true,
  },
  {
    key: "createdAt",
    label: "Joined us",
    isSortable: true,
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const stockChipColorMap = {
  instock: "success",
  outofstock: "danger",
};

export const renderCell = (product: Product, columnKey: React.Key) => {
  const cellValue = product[columnKey as keyof object];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{
            radius: "lg",
            src: product.displayImage?.imageUrl,
            alt: product.displayImage?.details,
            className: "w-10 h-10",
            showFallback: true,
            fallback: (
              <span className="material-symbols-rounded text-default-500">
                vaping_rooms
              </span>
            ),
          }}
          name={<span className="capitalize">{product.name}</span>}
        >
        </User>
      );
    case "status":
      return (
        <Chip
          className="capitalize"
          color={
            stockChipColorMap[product.status as "instock" | "outofstock"] as
              | "success"
              | "danger"
          }
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
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
          <Tooltip content="Edit Product">
            <Link href={EDIT_PRODUCT_PAGE_ROUTE(product.details)}>
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Link>
          </Tooltip>
          <Tooltip color="danger" content="Delete Product">
            <span className="cursor-pointer text-lg text-danger active:opacity-50">
              <Modal
                body={<>Are you sure you want to delete it</>}
                onSuccess={async () => {
                   await deleteProduct(product.details);
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
