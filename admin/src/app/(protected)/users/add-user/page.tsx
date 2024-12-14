import AddUserForm from "@/components/organisms/Forms/Users/AddUserForm";
import React from "react";

const AddUserPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">New User</h1>
      <AddUserForm />
    </div>
  );
};

export default AddUserPage;
