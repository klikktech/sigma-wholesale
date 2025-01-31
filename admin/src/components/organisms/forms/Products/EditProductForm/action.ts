"use server";

import { axios } from "@/lib/axios";
import { uploadFileToS3 } from "@/lib/s3";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes";
import { Message, ProductDetails } from "@/utils/types";
import {
    ProductFormValidator,
} from "@/utils/validators";
import { redirect } from "next/navigation";

export const editProductAction = async (
    details: string,
    state: undefined | Message,
    formData: FormData,
) => {
    const displayImage = formData.get("displayImage") as File;
    const displayImageUrl = formData.get("displayImageUrl") as string;
    const existingImageUrls = formData.get("existingImageUrls") as string;

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

    if (validatedFormFields.error) {
        return { error: validatedFormFields.error.errors[0].message as string };
    }

    if (validatedFormFields.success) {

        // Handle display image
        let newDisplayImageUrl;
        let newimageUrls: string[] = [];
        if (displayImage?.size > 0) {
            newDisplayImageUrl = await uploadFileToS3(displayImage, "productimages");
        } else if (displayImageUrl) {
            newDisplayImageUrl = displayImageUrl;
        }

        // Handle additional images
        console.log(existingImageUrls, "existing image urls");
        const existingUrls = existingImageUrls ? JSON.parse(existingImageUrls) : [];

        // Add new images directly
        const newImages = formData.getAll("newImages") as File[];
        newimageUrls = await Promise.all(
            newImages.map(image => uploadFileToS3(image, "productimages"))
        );
        newimageUrls.push(...existingUrls);

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
            details: details,
            displayImage: newDisplayImageUrl,
            images: newimageUrls,
        };

        const { data, status, error } = await axios.products.updateProduct(payload);
        console.log(data, status, error);
        if (error) {
            return { error: error.message };
        }
        if (data && status === 200) {
            redirect(PRODUCTS_PAGE_ROUTE);
        }
    }

    return { error: "Something went wrong, please try again" };
};
