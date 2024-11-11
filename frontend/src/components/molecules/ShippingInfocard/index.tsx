import { Card, CardBody, Input, Spacer } from "@nextui-org/react";

const ShippingInfoCard = () => {
    return (
        <Card>
            <CardBody>
                <p className="text-lg flex items-center">
                    <span className="material-symbols-rounded text-blue-500">distance</span>
                    Add Address</p>
                <Spacer y={3} />
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
                <div className="flex gap-1">
                    <Input
                        label="State*"
                        placeholder="Enter your state"
                        name="state"
                        labelPlacement="outside"
                        required
                    />
                    <Input
                        label="Country*"
                        placeholder="Enter your country"
                        name="country"
                        labelPlacement="outside"
                        required
                    />
                </div>
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
            </CardBody>
        </Card>
    );
};

export default ShippingInfoCard; 