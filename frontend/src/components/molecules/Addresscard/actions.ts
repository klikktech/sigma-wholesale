'use server';

import { axios } from "@/lib/axios";

export const deleteAddressAction = async (formData: FormData) => {
    try {
      console.log("delete address action",formData);
        const address = formData.get("address");
        console.log("action received address:", address);
        if (!address) {
            throw new Error("Address is required");
        }
        const { data, status } = await axios.users.deleteAddress(address as string);
        if (data && status === 200) {
            console.log("success", status, data)
            return { success: true };
        }
    } catch (error) {
        console.error("Error deleting address:", error);
        return { success: false, error };
    }
};