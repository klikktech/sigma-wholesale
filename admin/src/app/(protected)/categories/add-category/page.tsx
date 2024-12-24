import React from "react";
import AddCategoryForm from "@/components/organisms/forms/categories/AddCategoryForm";
import { axios } from "@/lib/axios";

const AddCategoryPage = async () => {
  const { data: categories, error: categoriesError } = await axios.products.getCategories();
  console.log(categories,"categories")
  if (categoriesError) {
    throw new Error(categoriesError.message);
  } 
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">New Category</h1>
      <AddCategoryForm categories={categories} />
    </div>
  );
};

export default AddCategoryPage;
