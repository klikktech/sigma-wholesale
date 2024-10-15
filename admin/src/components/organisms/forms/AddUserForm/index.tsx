"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Select, SelectItem, Textarea } from "@nextui-org/react";
import React from "react";

const AddUserForm = () => {
  //   const [formData, setFormData] = useState({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     username: "",
  //     password: "",
  //     role: "",
  //     phone: "",
  //     address: "",
  //   });

  //   const handleChange = (e: { target: { name: any; value: any } }) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  //   const handleSubmit = (e: { preventDefault: () => void }) => {
  //     e.preventDefault();
  //     // Handle form submission logic
  //     console.log("Form submitted:", formData);
  //   };
  return (
    <form
    //   onSubmit={handleSubmit}
    //   className="max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-lg font-semibold mb-4">Add User</h2>
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
              // value={formData.firstName}
              // onChange={handleChange}
              //   className="block w-full p-2 border border-gray-300 rounded"
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
              // value={formData.lastName}
              // onChange={handleChange}
              // className="block w-full p-2 border border-gray-300 rounded"
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
              // value={formData.username}
              // onChange={handleChange}
              // className="block w-full p-2 border border-gray-300 rounded"
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
              //   value={formData.email}
              //   onChange={handleChange}
              //   className="block w-full p-2 border border-gray-300 rounded"
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
              // value={formData.password}
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
              defaultSelectedKeys={["pending"]}
              //   value={formData.role}
              //   onChange={handleChange}
              //   className="block w-full p-2 border border-gray-300 rounded"
              required
            >
              <SelectItem key="customer">Customer</SelectItem>
              <SelectItem key="pending">Pending</SelectItem>
              <SelectItem key="admin">Administrator</SelectItem>
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
              //   value={formData.phone}
              //   onChange={handleChange}
              //   className="block w-full p-2 border border-gray-300 rounded"
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
            // value={formData.address}
            // onChange={handleChange}
            // className="block w-full p-2 border border-gray-300 rounded"
          ></Textarea>
        </div>
        <Button type="submit">Add User</Button>
      </div>
    </form>
  );
};

export default AddUserForm;
