"use server"
import { axios } from "@/lib/axios";
import { Message } from "@/utils/types";
import { LOGIN_PAGE_ROUTE } from "@/utils/urls";
import { UserForgotPasswordValidator } from "@/utils/validators";
import { redirect } from "next/navigation";

export const forgotPasswordConfirmAction = async (state: undefined | Message,
    formData: FormData) => {
    const token = formData.get("token");
    const newPassword = formData.get("newPassword");
    const confirmNewPassword = formData.get("confirmPassword");

    const parsedDetails = UserForgotPasswordValidator.safeParse({
        token,
        newPassword,
        confirmNewPassword,
    });

    if (parsedDetails.error) {
        return { error: parsedDetails.error.errors[0].message as string };
    }

    if (parsedDetails.success) {
        const { data, status, error } = await axios.auth.confirmForgotPassword(
            parsedDetails.data
        );

        if (error) {
            return { success: null, error: error.message };
        }
        if (data && status === 200) {
            redirect(LOGIN_PAGE_ROUTE);
        }
    }
}