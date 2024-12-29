'use server';

import { axios } from "@/lib/axios";
import { redirect } from "next/navigation";

export const deleteAddressAction = async (formData: FormData) => {
    console.log("delete address action", formData);
    const address = formData.get("address");
    console.log("action received address:", address);
    if (!address) {
        throw new Error("Address is required");
    }
    const { data, status, error } = await axios.users.deleteAddress(address as string);
    if (error) {
        if (error.message?.includes('Unauthorised')) {
            redirect('/unauthorised')
        } else {
            return { error: error.message };
        }
    }
    if (data && status === 200) {
        console.log("success", status, data)
        return { success: true };
    }
};