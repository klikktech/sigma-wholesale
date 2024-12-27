import UnauthorizedError from "@/components/molecules/Error";
import EditProductForm from "@/components/organisms/forms/Products/EditProductForm";
import { axios } from "@/lib/axios";
import React from "react";

const EditProductPage = async ({ params }: { params: { details: string } }) => {
  const { data: product, error: productError } = await axios.products.getProductForDetails(params.details);
  const { data: categories, error: categoriesError } = await axios.products.getCategories();
  const { data: brands, error: brandsError } = await axios.brands.getBrandsList();
  console.log(product,"product")

  if (categoriesError) {
    if (categoriesError.message?.includes('Unauthorised')) {
      return <UnauthorizedError />
    } else {
      throw new Error(categoriesError.message)
    }
  }
  if (brandsError) {
    if (brandsError.message?.includes('Unauthorised')) {
      return <UnauthorizedError />
    } else {
      throw new Error(brandsError.message)
    }
  }
  if (productError) {
    if (productError.message?.includes('Unauthorised')) {
      return <UnauthorizedError />
    } else {
      throw new Error(productError.message)
    }
  }
  
  return (
    <div>
      <EditProductForm product={product} categories={categories} brands={brands} />
    </div>
  );
};

export default EditProductPage;
