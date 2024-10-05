"use server";
import { RegisterFormValidator } from "@/utils/validators";

export interface SignUpErrors {
  errors?: {email?: string[];
            password?: string[];
            firstName?: string[];
            lastName?: string[];
            companyName?: string[];
            phoneNumber?: string[];
            altPhoneNumber?: string[];
            taxNumber?: string[];
            website?: string[];
            confirmPassword?: string[];
            bio?: string[];
            address1?: string[];
            address2?: string[];
            city?: string[];
            country?: string[];
            zipCode?: string[];
         };
  success: boolean;
}

export const createNewUser = async (
  data: SignUpErrors,
  formData: FormData
): Promise<SignUpErrors> => {
  const result = RegisterFormValidator.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    companyName: formData.get("companyName"),
    phoneNumber: formData.get("phoneNumber"),
    altPhoneNumber: formData.get("altPhoneNumber"),
    taxNumber: formData.get("taxNumber"),
    website: formData.get("website"),
    confirmPassword: formData.get("confirmPassword"),
    bio: formData.get("bio"),
    address1: formData.get("address1"),
    address2: formData.get("address2"),
    city: formData.get("city"),
    country: formData.get("country"),
    zipcode: formData.get("zipcode"),
  });

  if (result.success) {
    // now you can sign up or create new user inside your database
    console.log(result.data);
    return { success: true };
  }

  return {
    success: false,
    errors: result.error.flatten().fieldErrors,
  };
};