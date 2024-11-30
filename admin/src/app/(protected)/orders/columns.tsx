"use client";
import { Tooltip, Chip } from "@nextui-org/react";
import { EditIcon, EyeIcon } from "@/utils/icons";
import React from "react";
import { ITableColumn } from "@/utils/types";
import Link from "next/link";
import { updateOrderStatus } from "./actions";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

interface Order {
  id: string;
  // orderId: string;
  customerName: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export const ORDER_COLUMNS: ITableColumn[] = [
  {
    key: "id",
    label: "Order ID",
    isSortable: true,
    isSearchable: true,
  },
  {
    key: "buyer",
    label: "Customer",
    isSearchable: true,
  },
  {
    key: "orderTotal",
    label: "Total",
    isSortable: true,
  },
  {
    key: "orderStatus",
    label: "Order Status",
    isSortable: true,
  },
  {
    key: "paymentMethod",
    label: "Payment",
    isSortable: true,
  },
  {
    key: "orderCreatedAt",
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

const statusOptions = ["pending", "processing", "completed", "cancelled"];

const OrderActionsCell = ({ order }: { order: Order }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleStatusUpdate = async () => {
    try {
      setIsLoading(true);
      await updateOrderStatus(order.id, selectedStatus);
    } catch (error) {
      console.error('Failed to update order status:', error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex items-center gap-4">
      <Tooltip content="Edit Order Status">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" isIconOnly>
              <EditIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Order Status Options"
            onAction={(key) => {
              setSelectedStatus(key.toString());
              setIsOpen(true);
            }}
          >
            {statusOptions.map((status) => (
              <DropdownItem key={status} className="capitalize">
                {status}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Status Update</ModalHeader>
              <ModalBody>
                Are you sure you want to change the order status to &quot;{selectedStatus}&quot;?
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="light" 
                  onPress={onClose}
                  isDisabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleStatusUpdate}
                  isLoading={isLoading}
                >
                  {isLoading ? "Updating..." : "Confirm"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export const renderCell = (order: Order, columnKey: React.Key) => {
  const cellValue = order[columnKey as keyof object];

  switch (columnKey) {
    case "totalAmount":
      return <span>$ {cellValue}</span>;
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
      return <OrderActionsCell order={order} />;
    default:
      return cellValue;
  }
};
