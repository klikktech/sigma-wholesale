"use server";

import { axios } from "@/lib/axios";
import { USERS_PAGE_ROUTE } from "@/utils/routes";
import { Message, UserDetails } from "@/utils/types";
import { EditUserFormValidator } from "@/utils/validators";
import { redirect } from "next/navigation";

export const editUserAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const firstname = formData.get("firstName");
  const lastname = formData.get("lastName");
  const username = formData.get("username");
  const email = formData.get("email");
  const role = formData.get("role");
  const phone = formData.get("phone");
  const storeAddress = formData.get("address");
  const storeState = formData.get("state");
  const storeCity = formData.get("city");
  const storeZip = formData.get("zipcode");


  const parsedFields = EditUserFormValidator.safeParse({
    firstname,
    lastname,
    username,
    phone,
    role,
    storeAddress,
    email,
    storeState,
    storeCity,
    storeZip
  });
  if (parsedFields.error) {
    return { error: parsedFields.error.errors[0].message as string };
  }

  if (parsedFields.success) {
    const { data, status, error } = await axios.users.editUser(
      parsedFields.data as UserDetails
    );
    console.log(parsedFields.data, data, error,"in edit action.ts")
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
