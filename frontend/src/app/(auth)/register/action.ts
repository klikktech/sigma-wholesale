"use server";
import { axios } from "@/lib/axios";
import { Message, RegisterDetails } from "@/utils/types";
import { RegisterFormValidator } from "@/utils/validators";

export interface SignUpErrors {
  errors?: {email?: string[];
            password?: string[];
            firstName?: string[];
            lastName?: string[];
            nickName?: string[];
            phoneNumber?: string[];
            confirmPassword?: string[];
            shippingAddress?: string[];
            shippingCity?: string[];
            shippingState?: string[];
            shippingZipCode?: string[];
            billingAddress?: string[];
            billingCity?: string[];
            billingState?: string[];
            billingZipCode?: string[];
         };
  success: boolean;
}

export const createNewUser = async (
  state: undefined | Message,
  formData: FormData
) => {
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const password = formData.get("password")
  const nickName = formData.get("nickName")
  const phoneNumber = formData.get("phoneNumber")
  const confirmPassword = formData.get("confirmPassword")
  const shippingAddress = formData.get("shippingAddress")
  const shippingCity = formData.get("shippingCity")
  const shippingState = formData.get("shippingState")
  const shippingZip = formData.get("shippingZip")
  const storeAddress = formData.get("storeAddress")
  const storeCity = formData.get("storeCity")
  const storeState = formData.get("storeState")
  const storeZip = formData.get("storeZip")

  const formDetails = {
    firstName,
    lastName,
    email,
    password,
    nickName,
    phoneNumber,
    confirmPassword,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingZip,
    storeAddress,
    storeCity,
    storeState,
    storeZip
  }
  const parsedCredentials = RegisterFormValidator.safeParse({
    firstName,
    lastName,
    email,
    password,
    nickName,
    phoneNumber,
    confirmPassword,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingZip,
    storeAddress,
    storeCity,
    storeState,
    storeZip
  });
  
  let { confirmPassword, ...payload } = formDetails;
  payload = payload as RegisterDetails;

  console.log(payload,"register data");

  // if (parsedCredentials.success) {
    const { data, status, error } = await axios.auth.signUpWithEmail(
      payload
    );
    console.log(status, error, data)

    if (error) {
      return { error: error.message };
    // }
    // if (data && status === 200) {
    //   createSession(data);
    //   redirect(USERS_PAGE_ROUTE);
    // }
  }
};