"use server";

import { axios } from "@/lib/axios";
import { createSession, deleteSession } from "@/lib/axios/session";
import { Message } from "@/utils/types";
import { HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from "@/utils/urls";
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
  console.log(parsedCredentials, "parsedCredentials")
  if (parsedCredentials.error) {
    console.log(parsedCredentials.error, "parsedCredentials error")

    return { error: parsedCredentials.error.errors[0].message as string };
  }

  if (parsedCredentials.success) {
    console.log("inside login")
    const { data, status, error } = await axios.auth.signInWithEmail(
      parsedCredentials.data
    );
    console.log(data, status, error, "data status error")
    if (error) {
      console.log("error", error);
      return { error: error.message };
    }
    if (data && status === 200) {
      console.log("success", status, data)
      createSession(data);
      return { success: "Login successful!" };
    }
  }

  return { error: "Something went wrong, please try again" };
};

export const signOutAction = async () => {
  console.log("inside signout")
  await axios.auth.signOut();
  deleteSession();
  return redirect(LOGIN_PAGE_ROUTE);
};