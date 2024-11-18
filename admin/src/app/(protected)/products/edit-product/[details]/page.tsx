import EditProductForm from "@/components/organisms/forms/products/EditProductForm";
import { axios } from "@/lib/axios";
import React from "react";

const EditProductPage = async ({ params }: { params: { details: string } }) => {
  const { data, error } = await axios.products.getProductForDetails(params.details);
  if (error) {
    throw new Error(error.message);
  }
  
  return (
    <div>
      <EditProductForm product={data} />
    </div>
  );
};

export default EditProductPage;
