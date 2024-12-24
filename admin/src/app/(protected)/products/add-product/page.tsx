import AddProductForm from "@/components/organisms/forms/Products/AddProductForm";
import React from "react";
import { axios } from "@/lib/axios";

export const dynamic = 'force-dynamic';

const AddUserPage = async () => {
  const { data: categories, error: categoriesError } = await axios.products.getCategories();
  const { data: brands, error: brandsError } = await axios.brands.getBrandsList();

  if (categoriesError) {
    if (categoriesError.message?.includes('Unauthorised')) {
      throw new Error('UNAUTHORIZED', { cause: categoriesError.message });
    }
    else{
      throw new Error(categoriesError.message)
    }
  }
  if (brandsError) {
    if (brandsError.message?.includes('Unauthorised')) {
      throw new Error('UNAUTHORIZED', { cause: brandsError.message });
    }
    else{
      throw new Error(brandsError.message)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">New Product</h1>
      <AddProductForm categories={categories} brands={brands} />
    </div>
  );
};

export default AddUserPage;
