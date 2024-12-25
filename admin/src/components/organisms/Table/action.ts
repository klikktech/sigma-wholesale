"use server";


import { axios } from "@/lib/axios";
import { Message } from "@/utils/types";
import { redirect } from "next/navigation";

export const searchAction = async (
    type:string,
    state: undefined | Message,
    formData: FormData
) => {
    const keyword = formData.get("keyword") as string;
    const page = 0
    const size = 20
    const baseUrl = `${type}`;
    let data, status, error;

    switch (baseUrl) {
        case 'products':
            ({ data, status, error } = await axios.products.getSearchProductsList(keyword, page, size));
            break;
        case 'users':
            ({ data, status, error } = await axios.users.getSearchUsersList(keyword));
            break;
        case 'orders':
            ({ data, status, error } = await axios.orders.getSearchOrdersList(keyword));
            break;
        case 'categories':
            ({ data, status, error } = await axios.categories.getSearchCategoryList(keyword));
            break;
        default:
            return { error: "Invalid type" };
    }
    console.log(data,status,error,"data status error")
    if (error) {
        console.log("error", error);
        return { error: error.message };
    }
    if (data && status === 200) {
        redirect(`${baseUrl}?keyword=${encodeURIComponent(keyword)}`);
    }
};