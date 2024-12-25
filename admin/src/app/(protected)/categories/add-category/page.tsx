import React from "react";
import AddCategoryForm from "@/components/organisms/forms/categories/AddCategoryForm";
import { axios } from "@/lib/axios";

export const dynamic = 'force-dynamic';

const AddCategoryPage = async () => {
  const { data: categories, error: categoriesError } = await axios.products.getCategories();
  console.log(categories,"categories")

  if (categoriesError) {
    if (categoriesError.message?.includes('Unauthorised')) {
      throw new Error('UNAUTHORIZED', { 
        cause: {
          code: 'Unauthorised',
          message: 'Your session has expired. Please log in again.'
        }
      });
    } else {
      throw new Error('ERROR', { 
        cause: {
          code: 'UNKNOWN',
          message: categoriesError.message
        }
      });
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
