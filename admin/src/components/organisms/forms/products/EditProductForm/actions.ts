"use server";

import { axios } from "@/lib/axios";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes";
import { Message, ProductDetails } from "@/utils/types";
import {
  ProductFormValidator,
  ProductImagesValidator,
} from "@/utils/validators";
import { redirect } from "next/navigation";

const handleFileToBase64 = async (file: {
  arrayBuffer: () =>
    | WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>
    | PromiseLike<WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>>;
}) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  return buffer.toString("base64");
};

export const editProductAction = async (
  state: undefined | Message,
  formData: FormData,
) => {
  const displayImage = formData.get("displayImage");
  const images = formData.getAll("images");
  const validatedFormFields = ProductFormValidator.safeParse(
    Object.fromEntries(formData)
  );
  if (validatedFormFields.error) {
    return { error: validatedFormFields.error.errors[0].message as string };
  }

  const validatedImages = ProductImagesValidator.safeParse({
    displayImage,
    images,
  });
  if (validatedImages.error)
    return { error: validatedImages.error.errors[0].message as string };
  // if(data.displayImage) {
  //   const imageBuffer = Buffer.from(await data.displayImage.arrayBuffer())
  //   formObj.append("image", imageBuffer, {
  //     filename: data.image.name,
  //     contentType: data.image.type
  //   })
  // }
  const displayImageBase64 = await handleFileToBase64(
    validatedImages.data.displayImage
  );
  const imagesBase64 = await Promise.all(
    validatedImages.data.images.map(
      async (file) => await handleFileToBase64(file)
    )
  );
  if (validatedFormFields.success && validatedImages.success) {
    const payload: ProductDetails = {
      name: validatedFormFields.data.name,
      maxPrice: validatedFormFields.data.maxPrice,
      minPrice: validatedFormFields.data.minPrice,
      sku: validatedFormFields.data.sku,
      details:validatedFormFields.data.details,
      isOnSale: validatedFormFields.data.isOnSale as boolean,
      status: validatedFormFields.data.status as "instock" | "outofstock",
      displayStatus: "draft",
      // commentStatus: validatedFormFields.data.commentStatus,
    };
    const formData = new FormData();
    formData.append("product", JSON.stringify(payload));
    if (validatedImages.data.displayImage) formData.append("displayImage", validatedImages.data.displayImage);
    validatedImages.data.images.forEach((image, index) => {
      formData.append("images", image);
    });
    console.log(formData)
    const { data, status, error } = await axios.products.updateProduct(formData);
    console.log(data, status, error)
    if (error) {
      return { error: error.message };
    }
    if (data && status === 200) {
      redirect(PRODUCTS_PAGE_ROUTE);
    }
  }

  return { error: "Something went wrong, please try again" };
};
