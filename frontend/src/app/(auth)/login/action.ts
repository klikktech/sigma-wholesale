"use server";

import request from "@/api";
import { createSession, decrypt } from "@/api/session";
import { ResultCode } from "@/utils/functions";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/urls";
import { LoginFormValidator } from "@/utils/validators";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

interface Result {
  type: string;
  resultCode: ResultCode;
}

export async function authenticate(
  //   _prevState: Result | undefined,
  state: any,
  formData: FormData
) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("action", email, password);

    const parsedCredentials = LoginFormValidator.safeParse({
      email,
      password,
    });
    console.log("before parsed creds")
    if (parsedCredentials.success) {
      //   await new Promise((resolve) => {
      //     setTimeout(resolve, 5000);
      //   });
      console.log("before response")
      const response = await request.authenticate(parsedCredentials.data);
      console.log(response?.data, response?.status,"response")
      if (response?.status === 200) {
        const user = decrypt(response.data.accessToken);
        createSession(response.data);
        console.log("jka");
        redirect(PRODUCTS_PAGE_ROUTE);
        // return {
        //   type: "success",
        //   resultCode: ResultCode.UserLoggedIn,
        // };
      }
      return {
        type: "error",
        resultCode: ResultCode.UnknownError,
      };
    } else {
      return {
        errors: parsedCredentials.error.flatten().fieldErrors,
        // type: "error",
        // resultCode: ResultCode.InvalidCredentials,
      };
    }
  } catch (error) {
    if(isRedirectError(error)){
      throw error
    }
    // if (error instanceof Error) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return {
    //         type: 'error',
    //         resultCode: ResultCode.InvalidCredentials
    //       }
    //     default:
    return {
      type: "error",
      resultCode: ResultCode.UnknownError,
      //       }
      //   }
    };
  }
}
