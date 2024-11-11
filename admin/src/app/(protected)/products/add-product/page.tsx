import ProductForm from "@/components/organisms/forms/products/AddProductForm";
import React from "react";

const AddUserPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">New Product</h1>
      <ProductForm />
    </div>
  );
};

export default AddUserPage;
