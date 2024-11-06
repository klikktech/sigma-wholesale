import { z } from "zod";

export const LoginFormValidator = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const RegisterFormValidator = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .trim(),
  nickName: z
    .string()
    .min(2, { message: "Nick name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  phone: z
    .string()
    .min(10, { message: "Phone must be 10 characters long" })
    .regex(/[0-9]/, { message: "Please enter vaild Phone number." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
  confirmPassword: z.string().trim(),
  shippingAddress: z
    .string()
    .min(2, { message: "Shipping Address must be at least 2 characters long." })
    .trim(),
  shippingCity: z
    .string()
    .min(2, { message: "Shipping City must be at least 2 characters long." })
    .trim(),
  shippingState: z
    .string()
    .min(2, { message: "Shipping State must be at least 2 characters long." })
    .trim(),
  shippingZip: z
    .string()
    .min(5, { message: "Shipping Zip must be 5 characters long" })
    .regex(/[0-9]/, { message: "Please enter vaild shipping zip." })
    .trim(),
  storeAddress: z
    .string()
    .min(2, { message: "Store Address must be at least 2 characters long." })
    .trim(),
  storeCity: z
    .string()
    .min(2, { message: "Store City must be at least 2 characters long." })
    .trim(),
  storeState: z
    .string()
    .min(2, { message: "Store State must be at least 2 characters long." })
    .trim(),
  storeZip: z
    .string()
    .min(5, { message: "Store Zip must be 5 characters long" })
    .regex(/[0-9]/, { message: "Please enter vaild zipcode." }),
});
