'use client'
import {
    Card,
    Input,
    Spacer,
    Table,
    TableHeader,
    TableColumn,
    TableRow,
    TableCell,
    CardBody,
    RadioGroup,
    TableBody,
} from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { checkOutAction } from "@/app/(public)/check-out/action";
import FormMessage from "@/components/molecules/FormMessage";
import Button from "@/components/atoms/Button";
import { CartItem, Message } from "@/utils/types";
import ShippingInfoCard from "@/components/molecules/ShippingInfocard";
import MyAddressList from "../MyAddresses";
import { useState } from 'react';

interface CartListProps {
    cartItemsList: CartItem[];
    totalCost: number;
    discount: number;
    tax: number;
    shippingAddresses: any
}

const CheckOut = ({ cartItemsList, totalCost, discount, tax, shippingAddresses }: CartListProps) => {
    const [state, formAction] = useFormState((state: undefined | Message, formData: FormData) =>
        checkOutAction(state, formData, totalCost), undefined);
    const { pending } = useFormStatus();
    const [selectedAddress, setSelectedAddress] = useState<string>('new');

    const handleSubmit = (formData: FormData) => {
        if (selectedAddress !== 'new') {
            console.log(shippingAddresses,selectedAddress,"ship and select")
            const address = shippingAddresses.find(
                (addr:any) => addr.id.toString() === selectedAddress
            );

            console.log(address,"address details")
            if (address) {
                formData.set('firstName', address.firstName);
                formData.set('lastName', address.lastName);
                formData.set('address', address.address);
                formData.set('city', address.city);
                formData.set('state', address.state);
                formData.set('postalCode', address.zipcode);
                formData.set('phone', address.phone);
                formData.set('email', address.email);
            }
        }
        console.log(formData.entries(),"formdata")
        formAction(formData);
    };

    const total = totalCost - discount + tax;

    return (
        <div className="container my-3">
            <form action={handleSubmit}>
                <div className="flex flex-col md:flex-row justify-center gap-5">
                    <div className="flex flex-col w-full max-w-screen-sm">
                        <RadioGroup
                            value={selectedAddress}
                            onValueChange={setSelectedAddress}
                            className="mb-4"
                        >
                            <MyAddressList
                                addresses={shippingAddresses}
                                onSelect={setSelectedAddress}
                            />
                            {selectedAddress === 'new' && <ShippingInfoCard />}
                        </RadioGroup>
                    </div>

                    <div className="flex flex-col w-full max-w-md">
                        <Card>
                            <CardBody>
                                <p className="text-lg">Your Order</p>
                                <Spacer y={2} />
                                <Table aria-label="Order summary">
                                    <TableHeader>
                                        <TableColumn>Item</TableColumn>
                                        <TableColumn>Quantity</TableColumn>
                                        <TableColumn>Price</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {cartItemsList.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.variation.variationName}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>${item.variation.price.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Spacer y={2} />
                                <Input
                                    label="Coupon code"
                                    placeholder="Enter coupon code"
                                    name="coupon"
                                    labelPlacement="outside"
                                />
                                <Spacer y={2} />
                                <Button>Apply</Button>
                                <Spacer y={2} />
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>${totalCost.toFixed(2)}</p>
                                </div>
                                {tax > 0 && (
                                    <div className="flex justify-between">
                                        <p>Tax</p>
                                        <p>${tax.toFixed(2)}</p>
                                    </div>
                                )}
                                {discount > 0 && (
                                    <div className="flex justify-between">
                                        <p>Discount</p>
                                        <p>-${discount.toFixed(2)}</p>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <p>Total</p>
                                    <p>${total.toFixed(2)}</p>
                                </div>
                                <Spacer y={2} />
                                <Button
                                    type="submit"
                                    color="primary"
                                    disabled={pending}
                                    aria-disabled={pending}
                                >
                                    {pending ? "Placing Order..." : "Place Order"}
                                </Button>
                                {state && <FormMessage message={state} />}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CheckOut;