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

export const CheckOutFormValidator = z.object({
  firstname: z.string().min(2, { message: "First name must be at least 2 characters long." }).trim(),
  lastname: z.string().min(2, { message: "Last name must be at least 2 characters long." }).trim(),
  billingAddress: z.string().min(2, { message: "Billing Address must be at least 2 characters long." }).trim(),
  billingState: z.string().min(2, { message: "Billing State must be at least 2 characters long." }).trim(),
  billingCity: z.string().min(2, { message: "Billing City must be at least 2 characters long." }).trim(),
  postcode: z.string().min(5, { message: "Postcode must be 5 characters long" }).regex(/[0-9]/, { message: "Please enter vaild postcode." }).trim(),
  phone: z.string().min(10, { message: "Phone must be 10 characters long" }).regex(/[0-9]/, { message: "Please enter vaild phone number." }).trim(),
  customerIp: z.string().trim(),
  orderTotal: z.number().positive({ message: "Order total must be a positive number." }),
  paymentMethod: z.string().trim()   
});

export const UserDetailsValidator = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone must be 10 characters long" })
    .regex(/^\d+$/, { message: "Please enter a valid phone number." })
    .optional(),
  currentPassword: z
    .string()
    .min(8, { message: "Current password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
    .regex(/[0-9]/, { message: "Must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Must contain at least one special character." })
    .optional(),
  newPassword: z
    .string()
    .min(8, { message: "New password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
    .regex(/[0-9]/, { message: "Must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Must contain at least one special character." })
    .optional(),
  confirmNewPassword: z.string().optional(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "New password and confirm new password must match.",
  path: ["confirmNewPassword"],
});

export const UserForgotPasswordValidator = z.object({
  token: z.string().min(6, { message: "Code must be 6 characters long" }).regex(/[0-9]/, { message: "Please enter a valid code." }),
  newPassword: z
    .string()
    .min(8, { message: "New password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
    .regex(/[0-9]/, { message: "Must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Must contain at least one special character." }),
  confirmNewPassword: z.string().min(8, { message: "Confirm new password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
    .regex(/[0-9]/, { message: "Must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Must contain at least one special character." }),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "New password and confirm new password must match.",
  path: ["confirmNewPassword"],
});
