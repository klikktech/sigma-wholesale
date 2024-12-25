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
  
  // Create form data object with special handling for categories
  const formDataObject = Object.fromEntries(formData);
  const categories = formData.getAll("categories"); // Get all category values as array
  
  const validatedFormFields = ProductFormValidator.safeParse({
    ...formDataObject,
    categories // Override categories with the array
  });

  let variations = [];
  try {
    const variationsStr = formData.get('variations');
    if (variationsStr) {
      variations = JSON.parse(variationsStr as string);
    }
  } catch (error) {
    return { error: "Invalid variations data" };
  }
  console.log(validatedFormFields.error,"validatedFormFields")

  if (validatedFormFields.error) {
    return { error: validatedFormFields.error.errors[0].message as string };
  }

  const validatedImages = ProductImagesValidator.safeParse({
    displayImage,
    images,
  });
  if (validatedImages.error)
    return { error: validatedImages.error.errors[0].message as string };
  console.log(validatedFormFields,"validatedFormFields")
  if (validatedFormFields.success && validatedImages.success) {
    const payload: ProductDetails = {
      name: validatedFormFields.data.name,
      salePrice: validatedFormFields.data.salePrice,
      price: validatedFormFields.data.price,
      sku: validatedFormFields.data.sku,
      brand: validatedFormFields.data.brand,
      categories: validatedFormFields.data.categories,
      // subCategory: validatedFormFields.data.subCategory,
      isOnSale: validatedFormFields.data.isOnSale as boolean,
      status: validatedFormFields.data.status as "instock" | "outofstock",
      stockQuantity: validatedFormFields.data.stockQuantity,
      boxQuantity: validatedFormFields.data.boxQuantity,
      caseQuantity: validatedFormFields.data.caseQuantity,
      description: validatedFormFields.data.description,
      productType: validatedFormFields.data.productType,
      displayStatus: validatedFormFields.data.displayStatus,
      variations: variations,
    };
    console.log(payload, "payload")
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
