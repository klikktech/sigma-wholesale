import EditProductForm from "@/components/organisms/forms/products/EditProductForm"
import { axios } from "@/lib/axios";
import React from "react";

const EditProductPage = async ({ params }: { params: { details: string } }) => {
  const { data: product, error: productError } = await axios.products.getProductForDetails(params.details);
  const { data: categories, error: categoriesError } = await axios.products.getCategories();
  const { data: brands, error: brandsError } = await axios.brands.getBrandsList();
  if (categoriesError) {
    throw new Error(categoriesError.message);
  }
  if (brandsError) {
    throw new Error(brandsError.message);
  }
  if (productError) {
    throw new Error(productError.message);
  }
  
  return (
    <div>
      <EditProductForm product={product} categories={categories} brands={brands} />
    </div>
  );
};

export default EditProductPage;
