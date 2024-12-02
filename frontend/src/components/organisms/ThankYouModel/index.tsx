'use client'
import React from 'react';
import { Modal, Table, TableHeader, TableColumn, TableRow, TableCell, Spacer, Button, TableBody, ModalHeader, ModalBody, ModalFooter, ModalContent } from "@nextui-org/react";
import { CartItem } from "@/utils/types";
import { useRouter } from 'next/navigation';
import { HOME_PAGE_ROUTE } from '@/utils/urls';
import { useCartStore } from '@/store/cartStore';

interface ThankYouModalProps {
    visible: boolean;
    onClose: () => void;
    orderedItems: CartItem[];
    totalCost: number;
}

const ThankYouModal = ({ visible, onClose, orderedItems, totalCost }: ThankYouModalProps) => {
    const router = useRouter();
    const setCartCount = useCartStore((state) => state.setCartCount);
    
    const handleClose = () => {
        onClose();
        setCartCount(0,0);
        router.push(HOME_PAGE_ROUTE);
        router.refresh();
    };

    return (
        <Modal
            isOpen={visible}
            onClose={handleClose}
            closeButton
        >
            <ModalContent>
                <ModalHeader>
                    <h2 className="text-2xl font-bold">Thank You for Your Order!</h2>
                </ModalHeader>
                <ModalBody>
                    <p>Your order has been placed successfully. Here are the details:</p>
                    <Spacer y={2} />
                    <Table aria-label="Ordered items">
                        <TableHeader>
                            <TableColumn>Item</TableColumn>
                            <TableColumn>Quantity</TableColumn>
                            <TableColumn>Price</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {orderedItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.variation ? item.variation.variationName : item.product.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>${item.variation ? item.variation.price.toFixed(2) : parseInt(item.product.price).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Spacer y={2} />
                    <div className="flex justify-between">
                        <p>Total Cost</p>
                        <p>${totalCost.toFixed(2)}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ThankYouModal;