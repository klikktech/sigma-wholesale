"use server";

import { axios } from "@/lib/axios";
// import { axios } from "@/lib/axios";
// import { createSession, deleteSession } from "@/lib/axios/session";
// import { SIGNIN_PAGE_ROUTE, USERS_PAGE_ROUTE } from "@/utils/routes";
import { Message } from "@/utils/types";
import { HOME_PAGE_ROUTE } from "@/utils/urls";
import { CheckOutFormValidator } from "@/utils/validators";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";

export const checkOutAction = async (
  state: undefined | Message,
  formData: FormData,
  totalCost:number
) => {
  const response = await fetch('https://api64.ipify.org?format=json');
  const ipData = await response.json();
  const ipAddress = ipData.ip

  const email = formData.get("email");
  const  firstname = formData.get("firstName");
  const  lastname = formData.get("lastName");
  const  billingAddress = formData.get("address");
  const  billingState = formData.get("state");
  const  billingCity = formData.get("city");
  const  postcode = formData.get("postalCode");
  const  phone = formData.get("phone");
  const customerIp = ipAddress;
  const orderTotal = totalCost;
  const paymentMethod ='COD';

  const formDetails = {
    email,
    firstname,
    lastname,
    billingAddress,
    billingState,
    billingCity,
    postcode,
    phone,
    customerIp,
    orderTotal,
    paymentMethod
  };
  console.log(formDetails,"formdetails")

  const parsedCredentials = CheckOutFormValidator.safeParse(formDetails);
  if (parsedCredentials.error) {
    return { error: parsedCredentials.error.errors[0].message as string };
  }

  if (parsedCredentials.success) {
    const { data, status, error } = await axios.products.checkOut(
      formDetails
    );
    console.log(data,status,error)

    if (error) {
      return { error: error.message };
    }
    if (data && status === 200) {
      cookies().delete('cartCount')
      return { success: "Order placed successfully!" };
    }
  }

  return { error: "Something went wrong, please try again" };
};
