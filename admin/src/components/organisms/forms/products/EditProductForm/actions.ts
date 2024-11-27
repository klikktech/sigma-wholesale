"use server";

import { axios } from "@/lib/axios";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes";
import { Message, ProductDetails, Variation } from "@/utils/types";
import {
  ProductFormValidator,
  ProductImagesValidator,
} from "@/utils/validators";
import { redirect } from "next/navigation";

export const editProductAction = async (
  state: undefined | Message,
  formData: FormData,
) => {
  const displayImage = formData.get("displayImage");
  const images = formData.getAll("images");
  const productId = formData.get("productId");
  const validatedFormFields = ProductFormValidator.safeParse(
    Object.fromEntries(formData)
  );
  const productType = formData.get('productType');
  const variations = JSON.parse(formData.get('variations') as string || '[]');

  if (validatedFormFields.error) {
    return { error: validatedFormFields.error.errors[0].message as string };
  }

  const validatedImages = ProductImagesValidator.safeParse({
    displayImage,
    images,
  });
  
  if (validatedImages.error) {
    return { error: validatedImages.error.errors[0].message as string };
  }

  if (validatedFormFields.success && validatedImages.success) {
    const payload: ProductDetails = {
      name: validatedFormFields.data.name,
      price: Number(validatedFormFields.data.price),
      sku: validatedFormFields.data.sku,
      brand: validatedFormFields.data.brand,
      category: validatedFormFields.data.category,
      isOnSale: validatedFormFields.data.isOnSale as boolean,
      stockStatus: validatedFormFields.data.status as "instock" | "outofstock",
      stockQuantity: Number(validatedFormFields.data.stockQuantity),
      boxQuantity: Number(validatedFormFields.data.boxQuantity),
      caseQuantity: Number(validatedFormFields.data.caseQuantity),
      description: validatedFormFields.data.description,
      productType: validatedFormFields.data.productType,
      displayStatus: "draft",
      variations: variations,
    };

    const formDataToSend = new FormData();
    formDataToSend.append("product", JSON.stringify(payload));
    formDataToSend.append("productId", productId as string);

    if (validatedImages.data.displayImage) {
      formDataToSend.append("displayImage", validatedImages.data.displayImage);
    }

    validatedImages.data.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    const { data, status, error } = await axios.products.updateProduct(formDataToSend);

    if (error) {
      return { error: error.message };
    }

    if (data && status === 200) {
      redirect(PRODUCTS_PAGE_ROUTE);
    }
  }

  return { error: "Something went wrong, please try again" };
};
