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

  // console.log(images,"images")
  
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
  // console.log(validatedFormFields,"validatedFormFields")
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
    const formDataForSubmission = new FormData();
    formDataForSubmission.append("product", JSON.stringify(payload));
    
    // Upload display image to S3 if it exists
    if (validatedImages.data.displayImage) {
      try {
        const displayImageUrl = await uploadFileToS3(validatedImages.data.displayImage);
        formDataForSubmission.append("displayImage", displayImageUrl);
        console.log(displayImageUrl,"displayImageUrl")
      } catch (error) {
        return { error: "Failed to upload display image" };
      }
    }

    // Upload all product images to S3 if they exist
    if (validatedImages.data.images) {
      try {
        const imageUrls = await Promise.all(
          validatedImages.data.images.map(image => uploadFileToS3(image))
        );
        
        // Append all image URLs to formData
        imageUrls.forEach(url => {
          formDataForSubmission.append("images", url);
        });
        console.log(imageUrls,"imageUrls")
      } catch (error) {
        return { error: "Failed to upload product images" };
      }
    }

    console.log(formDataForSubmission,"formDataForSubmission")
    const { data, status, error } = await axios.products.addProduct(formDataForSubmission);

    if (error) {
      return { error: error.message };
    }
    if (data && status === 200) {
      redirect(PRODUCTS_PAGE_ROUTE);
    }
  }

  return { error: "Something went wrong, please try again" };
};
