"use server";

// import { axios } from "@/lib/axios";
// import { createSession, deleteSession } from "@/lib/axios/session";
// import { SIGNIN_PAGE_ROUTE, USERS_PAGE_ROUTE } from "@/utils/routes";
import { Message } from "@/utils/types";
// import { redirect } from "next/navigation";

export const checkOutAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const  firstName = formData.get("firstName");
  const  lastName = formData.get("lastName");
  const  address = formData.get("address");
  const  apt = formData.get("apt");
  const  city = formData.get("city");
  const  country = formData.get("country");
  const  postalCode = formData.get("postalCode");
  const  phone = formData.get("phone");
  const  addressType = formData.get("addressType");
  const  coupon = formData.get("coupon");

//   const parsedCredentials = checkOutFormValidator.safeParse({
//     email,
//     password,
//   });
//   if (parsedCredentials.error) {
//     return { error: parsedCredentials.error.errors[0].message as string };
//   }

//   if (parsedCredentials.success) {
//     const { data, status, error } = await axios.auth.signInWithEmail(
//       parsedCredentials.data
//     );
//     if (error) {
//       return { error: error.message };
//     }
//     if (data && status === 200) {
//       createSession(data);
//       redirect(USERS_PAGE_ROUTE);
//     }
//   }

  return { error: "Something went wrong, please try again" };
};
