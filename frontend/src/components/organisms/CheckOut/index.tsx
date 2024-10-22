'use client'
import {
    Card,
    Input,
    Radio,
    Checkbox,
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


interface Item {
    name: string;
    color: string;
    size: number;
    price: number;
    quantity: number;
}

export default function CheckOut() {
    const [state, formAction] = useFormState(checkOutAction, undefined);
    const { pending } = useFormStatus();

    const items: Item[] = [
        { name: "Training shoes", color: "Black", size: 42, price: 49.99, quantity: 1 },
        { name: "Sneakers", color: "Red", size: 42, price: 29.99, quantity: 1 },
        { name: "Running shoes", color: "Blue", size: 42, price: 39.99, quantity: 2 },
    ];

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = 10.99;
    const tax = 23.99;
    const total = subtotal - discount + tax;

    return (
        <div className="container mt-3">
            <div className="flex flex-row gap-2 flex-wrap">
                <div className="flex flex-col" style={{ width: "100%", maxWidth: "600px" }}>
                    <Card>
                        <CardBody>
                            <p className="text-lg">Shipping Information</p>
                            <Spacer y={3} />
                            <form action={formAction}>
                                <Input
                                    label="Email address*"
                                    placeholder="Enter your email"
                                    name="email"
                                    labelPlacement="outside"
                                    required
                                />
                                <Spacer y={2} />

                                <div className="flex gap-1">
                                    <Input
                                        label="First Name*"
                                        placeholder="Enter your first name"
                                        name="firstName"
                                        labelPlacement="outside"
                                        required
                                    />
                                    <Input
                                        label="Last Name*"
                                        placeholder="Enter your last name"
                                        name="lastName"
                                        labelPlacement="outside"
                                        required
                                    />
                                </div>
                                <Spacer y={2} />

                                <Input
                                    label="Address*"
                                    placeholder="123 Main St"
                                    name="address"
                                    labelPlacement="outside"
                                    required
                                />
                                <Spacer y={2} />

                                <Input
                                    label="Apt, suite, etc."
                                    placeholder="Apartment, studio, or floor"
                                    name="apt"
                                    labelPlacement="outside"
                                />
                                <Spacer y={2} />

                                <div className="flex gap-1">
                                    <Input
                                        label="City*"
                                        placeholder="Enter your city"
                                        name="city"
                                        labelPlacement="outside"
                                        required
                                    />
                                    <Input
                                        label="Postal code*"
                                        placeholder="12345"
                                        name="postalCode"
                                        labelPlacement="outside"
                                        required
                                    />
                                </div>
                                <Spacer y={2} />

                                <Input
                                    label="Phone number*"
                                    placeholder="+1 (555) 555-5555"
                                    name="phone"
                                    labelPlacement="outside"
                                    required
                                />
                                <Spacer y={2} />
                                <h4>Address type</h4>
                                <Spacer y={1} />
                                <RadioGroup
                                    orientation="horizontal"
                                >
                                    <Radio size="sm" value="Home">Home (All Day Delivery)</Radio>
                                    <Radio size="sm" value="Office">Office (Delivery Between 9AM - 6PM)</Radio>
                                </RadioGroup>
                                <Spacer y={2} />
                                <Checkbox size="sm">Same as shipping address</Checkbox>
                            </form>
                        </CardBody>
                    </Card>
                </div>

                <div className="flex flex-col" style={{ width: "100%", maxWidth: "400px" }}>
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
                                    {items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>${item.price.toFixed(2)}</TableCell>
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
                            <Button >Apply</Button>
                            <Spacer y={2} />
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>${subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Tax</p>
                                <p>${tax.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Discount</p>
                                <p>-${discount.toFixed(2)}</p>
                            </div>
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
        </div>
    );
}
