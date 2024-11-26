"use client";
import { Tooltip, Chip } from "@nextui-org/react";
import { EyeIcon } from "@/utils/icons";
import React from "react";
import { ITableColumn } from "@/utils/types";
import Link from "next/link";

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export const ORDER_COLUMNS: ITableColumn[] = [
  {
    key: "orderId",
    label: "Order ID",
    isSortable: true,
    isSearchable: true,
  },
  {
    key: "customerName",
    label: "Customer",
    isSearchable: true,
  },
  {
    key: "totalAmount",
    label: "Total",
    isSortable: true,
  },
  {
    key: "status",
    label: "Order Status",
    isSortable: true,
  },
  {
    key: "paymentStatus",
    label: "Payment",
    isSortable: true,
  },
  {
    key: "createdAt",
    label: "Order Date",
    isSortable: true,
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const statusColorMap = {
  pending: "warning",
  processing: "primary",
  completed: "success",
  cancelled: "danger",
};

const paymentStatusColorMap = {
  paid: "success",
  pending: "warning",
  failed: "danger",
};

export const renderCell = (order: Order, columnKey: React.Key) => {
  const cellValue = order[columnKey as keyof object];

  switch (columnKey) {
    case "totalAmount":
      return <span>₹{cellValue}</span>;
    case "status":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[order.status as keyof typeof statusColorMap] as "warning" | "primary" | "success" | "danger"}
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      );
    case "paymentStatus":
      return (
        <Chip
          className="capitalize"
          color={paymentStatusColorMap[order.paymentStatus as keyof typeof paymentStatusColorMap] as "warning" | "primary" | "success" | "danger"}
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
          <Tooltip content="View Details">
            <Link href={`/orders/${order.orderId}`}>
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EyeIcon />
              </span>
            </Link>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
