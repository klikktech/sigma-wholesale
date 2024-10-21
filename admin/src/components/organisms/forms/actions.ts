"use server";

import { axios } from "@/lib/axios";
import { USERS_PAGE_ROUTE } from "@/utils/routes";
import { Message, UserDetails } from "@/utils/types";
import { UserFormValidator } from "@/utils/validators";
import { redirect } from "next/navigation";

export const addUserAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");
  const phone = formData.get("phone");
  const address = formData.get("address");

  const parsedFields = UserFormValidator.safeParse({
    firstName,
    lastName,
    username,
    phone,
    role,
    address,
    email,
    password,
  });
  if (parsedFields.error) {
    return { error: parsedFields.error.errors[0].message as string };
  }

  if (parsedFields.success) {
    const { data, status, error } = await axios.users.addUser(
      parsedFields.data as UserDetails
    );
    if (error) {
      return { error: error.message };
    }
    if (data && status === 200) {
      // return { success: "User added successfully"}
      redirect(USERS_PAGE_ROUTE);
    }
  }

  return { error: "Something went wrong, please try again" };
};
