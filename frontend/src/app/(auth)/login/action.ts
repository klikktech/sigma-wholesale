"use server";

import { axios } from "@/lib/axios";
import { createSession, deleteSession } from "@/lib/axios/session";
import { Message } from "@/utils/types";
import { LOGIN_PAGE_ROUTE, HOME_PAGE_ROUTE } from "@/utils/urls";
import { LoginFormValidator } from "@/utils/validators";
import { redirect } from "next/navigation";

export const signInAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const parsedCredentials = LoginFormValidator.safeParse({
    email,
    password,
  });

  if (parsedCredentials.error) {
    return { error: parsedCredentials.error.errors[0].message as string };
  }

  if (parsedCredentials.success) {
    const { data, status, error } = await axios.auth.signInWithEmail(
      parsedCredentials.data
    );

    if (error) {
      return { success: null, error: error.message };
    }
    if (data && status === 200) {
      createSession(data);
      redirect(HOME_PAGE_ROUTE);
    }
  }

  return { success: null, error: "Something went wrong, please try again" };
};

export const signOutAction = async () => {
  console.log("inside signout")
  await axios.auth.signOut();
  deleteSession();
  return redirect(LOGIN_PAGE_ROUTE);
};