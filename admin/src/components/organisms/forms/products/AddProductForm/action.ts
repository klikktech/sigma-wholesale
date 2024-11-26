"use server";

import { axios } from "@/lib/axios";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes";
import { Message, ProductDetails } from "@/utils/types";
import {
  ProductFormValidator,
  ProductImagesValidator,
} from "@/utils/validators";
import { redirect } from "next/navigation";

export const addProductAction = async (
  state: undefined | Message,
  formData: FormData,
) => {
  const displayImage = formData.get("displayImage");
  const images = formData.getAll("images");
  const validatedFormFields = ProductFormValidator.safeParse(
    Object.fromEntries(formData)
  );
console.log(displayImage,images,validatedFormFields,"edit prod")
  if (validatedFormFields.error) {
    return { error: validatedFormFields.error.errors[0].message as string };
  }

  const validatedImages = ProductImagesValidator.safeParse({
    displayImage,
    images,
  });
  if (validatedImages.error)
    return { error: validatedImages.error.errors[0].message as string };
  if (validatedFormFields.success && validatedImages.success) {
    const payload: ProductDetails = {
      name: validatedFormFields.data.name,
      maxPrice: validatedFormFields.data.maxPrice,
      minPrice: validatedFormFields.data.minPrice,
      sku: validatedFormFields.data.sku,
      isOnSale: validatedFormFields.data.isOnSale as boolean,
      status: validatedFormFields.data.status as "instock" | "outofstock",
      displayStatus: "draft",
    };
    const formData = new FormData();
    formData.append("product", JSON.stringify(payload));
    if (validatedImages.data.displayImage) formData.append("displayImage", validatedImages.data.displayImage);
    validatedImages.data.images.forEach((image) => {
      formData.append("images", image);
    });
    const { data, status, error } = await axios.products.addProduct(formData);

    if (error) {
      return { error: error.message };
    }
    if (data && status === 200) {
      redirect(PRODUCTS_PAGE_ROUTE);
    }
  }

  return { error: "Something went wrong, please try again" };
};
