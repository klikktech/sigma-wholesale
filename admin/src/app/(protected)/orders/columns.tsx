"use client";
import { Tooltip, Chip } from "@nextui-org/react";
import { EditIcon, EyeIcon } from "@/utils/icons";
import React, { Suspense } from "react";
import { ITableColumn } from "@/utils/types";
import { updateOrderStatus, getOrderDetails } from "./actions";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import FormSubmitButton from "@/components/molecules/FormSubmitButtton";
import Loading from "../loading";

interface Order {
  id: string;
  customerName: string;
  totalAmount: number;
  orderStatus: string;
  paymentMethod: string;
  createdAt: string;
}

interface OrderItem {
  variation: {
    variationName: string;
    price: number;
  };
  product: {
    name: string;
    price: number;
  };
  quantity: number;
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
  PENDING: "warning",
  PROCESSING: "primary",
  COMPLETED: "success",
  CANCELLED: "danger",
};

const paymentStatusColorMap = {
  cod: "primary",
  PENDING: "warning",
  FAILED: "danger",
};

const statusOptions = ["pending", "processing", "completed", "cancelled"];

const OrderActionsCell = ({ order }: { order: Order }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>([]);

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

  const handleViewDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getOrderDetails(id);
      if (response.data) {
        setOrderItems(response.data);
        setIsDetailsOpen(true);
      }
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    } finally {
      setIsLoading(false);
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
      <Tooltip content="Details">
        <span
          className="cursor-pointer"
          onClick={() => handleViewDetails(order.id)}
        >
          <EyeIcon />
        </span>
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
                <FormSubmitButton
                  buttonText={isLoading ? "Updating..." : "Confirm"}
                  onPress={handleStatusUpdate}
                  isLoading={isLoading}
                >
                </FormSubmitButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Suspense fallback={<Loading />}>
        <Modal isOpen={isDetailsOpen} onOpenChange={setIsDetailsOpen} className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Order Details</ModalHeader>
                <ModalBody>
                  <div className="space-y-4">
                    {orderItems?.length > 0 ? orderItems.map((item, index) => (
                      <div key={index} className="border-b pb-2">
                        <p className="font-medium">{item.variation ? item.variation?.variationName : item.product?.name}</p>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Quantity: {item.quantity}</span>
                          <span>
                            Price: ${item.variation ? item.variation.price : item.product?.price}
                          </span>
                        </div>
                      </div>
                    )) : <p>No items found</p>}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <FormSubmitButton buttonText="Close" onPress={onClose} />
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Suspense>
    </div>
  );
};

export const renderCell = (order: Order, columnKey: React.Key) => {
  const cellValue = order[columnKey as keyof object];

  switch (columnKey) {
    case "totalAmount":
      return <span>$ {cellValue}</span>;
    case "orderStatus":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[order.orderStatus as keyof typeof statusColorMap] as "warning" | "primary" | "success" | "danger"}
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      );
    case "paymentMethod":
      return (
        <Chip
          className="capitalize"
          color={paymentStatusColorMap[order.paymentMethod as keyof typeof paymentStatusColorMap] as "warning" | "primary" | "success" | "danger"}
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
        <OrderActionsCell order={order} />
      );
    default:
      return cellValue;
  }
};
