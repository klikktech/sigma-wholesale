"use server";

import { axios } from "@/lib/axios";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes";
import { Message, ProductDetails } from "@/utils/types";
import {
  ProductFormValidator,
  ProductImagesValidator,
} from "@/utils/validators";
import { redirect } from "next/navigation";
import { uploadFileToS3 } from "@/lib/s3";

export const addProductAction = async (
  state: undefined | Message,
  formData: FormData,
) => {
  const displayImage = formData.get("displayImage");
  const images = formData.getAll("images");

  // Create form data object with special handling for categories
  const formDataObject = Object.fromEntries(formData);
  const categories = formData.getAll("categories");

  const validatedFormFields = ProductFormValidator.safeParse({
    ...formDataObject,
    categories
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
  console.log(validatedFormFields.error, "validatedFormFields")

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

    // Upload display image to S3 if it exists
    let displayImageUrl;
    let imageUrls: string[] = [];
    if (validatedImages.data.displayImage) {
      try {
        displayImageUrl = await uploadFileToS3(validatedImages.data.displayImage, "productimages");
        console.log(displayImageUrl, "displayImageUrl")
      } catch (error) {
        return { error: "Failed to upload display image" };
      }
    }

    // Upload all product images to S3 if they exist
    if (validatedImages.data.images) {
      try {
        imageUrls = await Promise.all(
          validatedImages.data.images.map(image => uploadFileToS3(image, "productimages"))
        );
        console.log(imageUrls, "imageUrls")
      } catch (error) {
        return { error: "Failed to upload product images" };
      }
    }

    const payload: ProductDetails = {
      name: validatedFormFields.data.name,
      salePrice: validatedFormFields.data.salePrice,
      price: validatedFormFields.data.price,
      sku: validatedFormFields.data.sku,
      brand: validatedFormFields.data.brand,
      categories: validatedFormFields.data.categories,
      isOnSale: validatedFormFields.data.isOnSale as boolean,
      status: validatedFormFields.data.status as "instock" | "outofstock",
      stockQuantity: validatedFormFields.data.stockQuantity,
      boxQuantity: validatedFormFields.data.boxQuantity,
      caseQuantity: validatedFormFields.data.caseQuantity,
      description: validatedFormFields.data.description,
      productType: validatedFormFields.data.productType,
      displayStatus: validatedFormFields.data.displayStatus,
      variations: variations,
      displayImage: displayImageUrl,
      images: imageUrls,
    };

    const { data, status, error } = await axios.products.addProduct(payload);

    if (error) {
      return { error: error.message };
    }
    if (data && status === 200) {
      redirect(PRODUCTS_PAGE_ROUTE);
    }
  }

  return { error: "Something went wrong, please try again" };
};
