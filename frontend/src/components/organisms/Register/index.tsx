"use client";
import { useFormState } from "react-dom";
import { Input, Spacer, Tab, Tabs } from "@nextui-org/react";
import { createNewUser } from "@/app/(auth)/register/action";
import Button from "@/components/atoms/Button";
import { useState } from "react";

interface FormErrorProps {
  errors?: string[];
}

const SignUp = () => {
  const [state, formAction] = useFormState(createNewUser, undefined);

  // State to hold input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nickName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    storeAddress: '',
    storeCity: '',
    storeState: '',
    storeZip: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      newFormData.append(key, value);
    });
    await formAction(newFormData);
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md"
      >

        <Input
          label="First Name *"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="John"
          labelPlacement="outside"
        />

        <Spacer y={3} />

        <Input
          label="Last Name *"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
          labelPlacement="outside"
        />

        <Spacer y={3} />
        <Input
          label="Nick Name"
          name="nickName"
          value={formData.nickName}
          onChange={handleChange}
          placeholder="Howdy"
          labelPlacement="outside"
          fullWidth
        />

        <Spacer y={3} />
        <Input
          label="Email *"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="johndoe@example.com"
          labelPlacement="outside"
          fullWidth
        />

        <Spacer y={3} />
        <Input
          label="Phone Number *"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          placeholder="123-456-7890"
          maxLength={10}
          labelPlacement="outside"
          fullWidth
        />
        <Spacer y={3} />

        <Input
          label="Password *"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="********"
          labelPlacement="outside"
          fullWidth
        />
        <Spacer y={3} />

        <Input
          label="Confirm Password *"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="********"
          labelPlacement="outside"
          fullWidth
        />

        <Spacer y={5} />

        <Tabs className="flex justify-evenly" key="underlined" fullWidth color="primary" aria-label="Tabs variants">
          <Tab key="shipping" 
            title="Shipping Address" style={{ color: 'black !important' }}>
            <Input
              label="Shipping Address *"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              placeholder="123 Main St"
              labelPlacement="outside"
              fullWidth
            />
            <Spacer y={3} />

            <Input
              label="Shipping City *"
              name="shippingCity"
              value={formData.shippingCity}
              onChange={handleChange}
              placeholder="City"
              labelPlacement="outside"
              fullWidth
            />
            <Spacer y={3} />

            <Input
              label="Shipping State *"
              name="shippingState"
              value={formData.shippingState}
              onChange={handleChange}
              placeholder="State"
              labelPlacement="outside"
              fullWidth
            />
            <Spacer y={3} />

            <Input
              label="Shipping Zip Code *"
              name="shippingZip"
              value={formData.shippingZip}
              onChange={handleChange}
              placeholder="ZIP"
              maxLength={5}
              labelPlacement="outside"
              fullWidth
            />
          </Tab>
          <Tab key="store" 
            title="Store Address" className="text-black">
            <Input
                label="Store Address *"
                name="storeAddress"
                value={formData.storeAddress}
                onChange={handleChange}
                placeholder="123 Main St"
                labelPlacement="outside"
                fullWidth
              />
              <Spacer y={3} />

              <Input
                label="Store City *"
                name="storeCity"
                value={formData.storeCity}
                onChange={handleChange}
                placeholder="City"
                labelPlacement="outside"
                fullWidth
              />
              <Spacer y={3} />

              <Input
                label="Store State *"
                name="storeState"
                value={formData.storeState}
                onChange={handleChange}
                placeholder="State"
                labelPlacement="outside"
                fullWidth
              />
              <Spacer y={3} />

              <Input
                label="Store Zip Code *"
                name="storeZip"
                value={formData.storeZip}
                onChange={handleChange}
                placeholder="ZIP"
                maxLength={5}
                labelPlacement="outside"
                fullWidth
              />
          </Tab>
        </Tabs>

        <Spacer y={3} />
        {state?.error && <p style={{ color: "red" }}>{state?.error}</p>}
        <Button type="submit" color="primary" size="lg">
          Register
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
