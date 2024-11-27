"use server";

import { axios } from "@/lib/axios";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes";
import { Message, ProductDetails } from "@/utils/types";
import {
  ProductFormValidator,
  ProductImagesValidator,
} from "@/utils/validators";
import { redirect } from "next/navigation";

interface ProductVariation {
  name: string;
  price: string;
  salePrice: string;
  sku: string;
  status: string;
}

export const addProductAction = async (
  state: undefined | Message,
  formData: FormData,
) => {
  const displayImage = formData.get("displayImage");
  const images = formData.getAll("images");
  const validatedFormFields = ProductFormValidator.safeParse(
    Object.fromEntries(formData)
  );
  const productType = formData.get('productType');
  const variations = JSON.parse(formData.get('variations') as string || '[]');
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
      price: validatedFormFields.data.price,
      sku: validatedFormFields.data.sku,
      brand: validatedFormFields.data.brand,
      category: validatedFormFields.data.category,
      isOnSale: validatedFormFields.data.isOnSale as boolean,
      stockStatus: validatedFormFields.data.status as "instock" | "outofstock",
      stockQuantity: validatedFormFields.data.stockQuantity,
      boxQuantity: validatedFormFields.data.boxQuantity,
      caseQuantity: validatedFormFields.data.caseQuantity,
      description: validatedFormFields.data.description,
      productType: validatedFormFields.data.productType,
      displayStatus: "draft",
      variations: JSON.parse(variations),
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


  if (productType === 'variation' && variations.length > 0) {
    console.log(variations,"variations")
    // Add logic to save variations
    // This will depend on your backend implementation
  }

  return { error: "Something went wrong, please try again" };
};
