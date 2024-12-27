import React from "react";
import AddCategoryForm from "@/components/organisms/forms/categories/AddCategoryForm";
import { axios } from "@/lib/axios";
import UnauthorizedError from "@/components/molecules/Error";

export const dynamic = 'force-dynamic';

const AddCategoryPage = async () => {
  const { data: categories, error: categoriesError } = await axios.products.getCategories();
  console.log(categories,"categories")

  if (categoriesError) {
    if (categoriesError.message?.includes('Unauthorised')) {
      return <UnauthorizedError />
    } else {
      throw new Error(categoriesError.message)  
    }
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">New Category</h1>
      <AddCategoryForm categories={categories} />
    </div>
  );
};

export default AddCategoryPage;
