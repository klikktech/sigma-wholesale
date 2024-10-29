import EditProductForm from "@/components/organisms/forms/products/EditProductForm";
import { axios } from "@/lib/axios";
import React from "react";

const EditProductPage = async ({ params }: { params: { details: string } }) => {
  const { data } = await axios.products.getProductForDetails(params.details);
  console.log(data, "product");
  return (
    <div>
      <EditProductForm product={data} />
    </div>
  );
};

export default EditProductPage;
