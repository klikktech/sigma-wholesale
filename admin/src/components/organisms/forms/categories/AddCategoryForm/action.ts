'use server'

import { axios } from "@/lib/axios";
import { CATEGORIES_PAGE_ROUTE } from "@/utils/routes";
import { redirect } from "next/navigation";

export const addCategoryAction = async (state: any, formData: FormData) => {
    const name = formData.get("name");
    const isSubcategory = formData.get("isSubcategory");
    const parentCategory = formData.get("parentCategory");
    const payload = {
        name,
        isSubcategory,
        parentCategory
    }
    console.log("payload", payload)
    const result = await axios.categories.addCategory(payload);
    console.log("result", result)
    if (result.error) {
        return { error: result.error };
    }
    if (result.data && result.status === 200) {
        redirect(CATEGORIES_PAGE_ROUTE);
    }
}