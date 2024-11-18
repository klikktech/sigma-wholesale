"use server";

import { axios } from "@/lib/axios";
import { Message, UserDetails } from "@/utils/types";
import { UserDetailsValidator } from "@/utils/validators";
import { redirect } from "next/navigation";
import { ACCOUNT_PAGE_ROUTE } from "@/utils/urls";

export const updateUserDetailsAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const phone = formData.get("phone");
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmNewPassword = formData.get("confirmNewPassword");

  const parsedDetails = UserDetailsValidator.safeParse({
    phone,
    currentPassword,
    newPassword,
    confirmNewPassword,
  });

  if (parsedDetails.error) {
    return { error: parsedDetails.error.errors[0].message as string };
  }

  if (parsedDetails.success) {
    const { confirmNewPassword, ...detailsToSend } = parsedDetails.data;

    const { data, status, error } = await axios.users.updateUserDetails(
      detailsToSend as UserDetails
    );

    if (error) {
      return { error: error.message };
    }

    if (data && status === 200) {
      redirect(ACCOUNT_PAGE_ROUTE);
    }
  }

  return { error: "Something went wrong, please try again" };
};
