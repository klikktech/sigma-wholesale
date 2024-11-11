"use server";

import { axios } from "@/lib/axios";
import {
  createSession,
  deleteSession,
  getRefreshToken,
} from "@/lib/axios/session";
import { SIGNIN_PAGE_ROUTE, USERS_PAGE_ROUTE } from "@/utils/routes";
import { Message } from "@/utils/types";
import { SignInFormValidator } from "@/utils/validators";
import { redirect } from "next/navigation";

export const signInAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const parsedCredentials = SignInFormValidator.safeParse({
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
      return { error: error.message };
    }
    if (data && status === 200) {
      createSession(data);
      redirect(USERS_PAGE_ROUTE);
    }
  }

  return { error: "Something went wrong, please try again" };
};

export const signOutAction = async () => {
  await axios.auth.signOut();
  deleteSession();
  redirect(SIGNIN_PAGE_ROUTE);
};

export const sessionExpiredAction = async () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    const { data, error } = await axios.auth.refreshToken(refreshToken);
    if (error) {
      deleteSession();
      redirect(SIGNIN_PAGE_ROUTE);
    } else {
      createSession(data);
      redirect(USERS_PAGE_ROUTE);
    }
  }
  deleteSession();
  redirect(SIGNIN_PAGE_ROUTE);
};
