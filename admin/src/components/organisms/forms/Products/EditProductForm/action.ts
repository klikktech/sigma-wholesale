"use server";

import { axios } from "@/lib/axios";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes";
import { Message, ProductDetails } from "@/utils/types";
import {
    ProductFormValidator,
} from "@/utils/validators";
import { redirect } from "next/navigation";

// Utility function to convert URL to File
async function urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
}

export const editProductAction = async (
    details: string,
    state: undefined | Message,
    formData: FormData,
) => {
    const displayImage = formData.get("displayImage") as File;
    const displayImageUrl = formData.get("displayImageUrl") as string;
    const images = formData.getAll("images") as File[];
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
        };

        const formDataToSend = new FormData();
        formDataToSend.append("product", JSON.stringify(payload));
        
        // Handle display image
        if (displayImage?.size > 0) {
            formDataToSend.append("displayImage", displayImage);
        } else if (displayImageUrl) {
            const displayImageFile = await urlToFile(
                displayImageUrl,
                `display-${validatedFormFields.data.sku}.jpg`
            );
            formDataToSend.append("displayImage", displayImageFile);
        }
        
        // Handle additional images
        console.log(existingImageUrls, "existing image urls");
        const existingUrls = existingImageUrls ? JSON.parse(existingImageUrls) : [];
        const existingImageFiles = await Promise.all(
            existingUrls.map(async (url: string, index: number) => {
                return await urlToFile(
                    url,
                    `image-${validatedFormFields.data.sku}-${index}.jpg`
                );
            })
        );
        
        // Add converted existing images
        existingImageFiles.forEach(file => {
            formDataToSend.append("images", file);
        });

        // Add new images directly
        const newImages = formData.getAll("newImages") as File[];
        newImages.forEach(file => {
            formDataToSend.append("images", file);
        });

        console.log(formDataToSend, "edit product form data");
        
        const { data, status, error } = await axios.products.updateProduct(formDataToSend);
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
