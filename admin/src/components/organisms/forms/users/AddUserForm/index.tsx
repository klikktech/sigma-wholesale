"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Select, SelectItem, Textarea } from "@nextui-org/react";
import React from "react";
import { addUserAction } from "./action";
import { useFormState, useFormStatus } from "react-dom";
import FormMessage from "@/components/molecules/FormMessage";
import Link from "next/link";
import { USERS_PAGE_ROUTE } from "@/utils/routes";

const AddUserForm = () => {
  const [state, formAction] = useFormState(addUserAction, undefined);
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
              htmlFor="firstname"
            >
              First Name
            </label>
            <Input
              type="text"
              id="firstname"
              name="firstname"
              required
            />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <Input
              type="text"
              id="lastname"
              name="lastname"
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
              required
            />
          </div>
          <div className="w-full">
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
          </div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="role">
              Role<span className="text-danger">*</span>
            </label>
            <Select
              id="role"
              name="role"
              defaultSelectedKeys={["PENDING"]}
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
            {pending ? "Adding new user" : "Add User"}
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

export default AddUserForm;
