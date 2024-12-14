"use server";
import { axios } from "@/lib/axios";
import { Message, RegisterDetails } from "@/utils/types";
import { LOGIN_PAGE_ROUTE } from "@/utils/urls";
import { RegisterFormValidator } from "@/utils/validators";
import { redirect } from "next/navigation";

export const createNewUser = async (
  state: undefined | Message,
  formData: FormData
) => {
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const nickname = formData.get("nickname");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const shippingAddress = formData.get("shippingAddress");
  const shippingCity = formData.get("shippingCity");
  const shippingState = formData.get("shippingState");
  const shippingZip = formData.get("shippingZip");
  const storeAddress = formData.get("storeAddress");
  const storeCity = formData.get("storeCity");
  const storeState = formData.get("storeState");
  const storeZip = formData.get("storeZip");

  const formDetails = {
    firstname,
    lastname,
    nickname,
    email,
    phone,
    password,
    confirmPassword,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingZip,
    storeAddress,
    storeCity,
    storeState,
    storeZip,
  };

  const parsedCredentials = RegisterFormValidator.safeParse(formDetails);

  if (parsedCredentials.error) {
    return { error: parsedCredentials.error.errors[0].message as string };
  }

  if (password !== confirmPassword) {
    return { error: "Password and confirm password are not equal" };
  }

  const payload: RegisterDetails = formDetails as unknown as RegisterDetails;

  if (parsedCredentials.success) {
    const { data, status, error } = await axios.auth.signUpWithEmail(payload);
    console.log(status, error, data);
    if (error) {
      return { error: error.message };
    }
    if (data && status === 200) {
      return { success: "Registration successful!" };
    }
  }
};