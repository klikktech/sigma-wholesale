"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Select, SelectItem, Textarea } from "@nextui-org/react";
import React from "react";
import { editUserAction } from "./action";
import { useFormState, useFormStatus } from "react-dom";
import FormMessage from "@/components/molecules/FormMessage";
import Link from "next/link";
import { USERS_PAGE_ROUTE } from "@/utils/routes";

const EditUserForm = ({user}:any) => {
  const [state, formAction] = useFormState(editUserAction, undefined);
  const { pending } = useFormStatus();
  return (
    <form
      action={formAction}
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-full gap-2">
          <div className="w-full">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={user.firstname}
              required
            />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={user.lastname}

            />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username<span className="text-danger">*</span>
            </label>
            <Input
              type="text"
              id="username"
              name="username"
              defaultValue={user.username}
              readOnly
              required
            />
          </div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email<span className="text-danger">*</span>
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
              readOnly
              required
            />
          </div>
          {/* <div className="w-full">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password<span className="text-danger">*</span>
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              required
            />
          </div> */}
        </div>
        <div className="w-full flex gap-2">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="role">
              Role<span className="text-danger">*</span>
            </label>
            <Select
              id="role"
              name="role"
              defaultSelectedKeys={[user.role]}
              required
            >
              <SelectItem key="CUSTOMER">Customer</SelectItem>
              <SelectItem key="PENDING">Pending</SelectItem>
              <SelectItem key="ADMIN">Administrator</SelectItem>
            </Select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Phone
            </label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              defaultValue={user.phone}
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium mb-1" htmlFor="address">
            Address
          </label>
          <Textarea
            id="address"
            name="address"
            defaultValue={user.storeAddress[0]?.address}
          ></Textarea>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="state">
              State
            </label>
            <Input
              type="text"
              id="state"
              name="state"
              defaultValue={user.storeAddress[0]?.state}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="city">
              City
            </label>
            <Input
              type="text"
              id="city"
              name="city"
              defaultValue={user.storeAddress[0]?.city}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="zipcode">
              Zipcode
            </label>
            <Input
              type="text"
              id="zipcode"
              name="zipcode"
              defaultValue={user.storeAddress[0]?.zipcode}
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <Button
            className="w-full"
            type="submit"
            disabled={pending}
            aria-disabled={pending}
          >
            {pending ? "Updating user" : "Update User"}
          </Button>
          <Link className="w-full" href={USERS_PAGE_ROUTE}>
            <Button className="w-full" color="default">
              Cancel
            </Button>
          </Link>
        </div>
        {state && <FormMessage message={state} />}
      </div>
    </form>
  );
};

export default EditUserForm;
