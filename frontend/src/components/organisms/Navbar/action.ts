"use server";

import { axios } from "@/lib/axios";
import { Message } from "@/utils/types";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/urls";
import { redirect } from "next/navigation";

export const searchAction = async (
    state: undefined | Message,
    formData: FormData
) => {
    const keyword = formData.get("keyword") as string;
    const page = 0
    const size = 16
    const { data, status, error } = await axios.products.getSearchProductsList(keyword, page, size);
    console.log(data, status, error, "data status error")
    if (error) {
        console.log("error", error)
        return { error: error.message };
    }
    if (data && status === 200) {
        console.log("search success", status, data)
        redirect(`${PRODUCTS_PAGE_ROUTE}?keyword=${encodeURIComponent(keyword)}`);
    }
};