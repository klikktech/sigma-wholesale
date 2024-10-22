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
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  companyName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  phoneNumber: z
    .string()
    .min(10, { message: "must be 10 characters long" })
    .regex(/[0-9]/, { message: "Please enter vaild Phone number." }),
  password: z
  .string()
  .min(8, { message: "Be at least 8 characters long" })
  .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
  .regex(/[0-9]/, { message: "Contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Contain at least one special character.",
  })
  .trim(),
  confirmPassword: z
  .string()
  .min(8, { message: "Be at least 8 characters long" })
  .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
  .regex(/[0-9]/, { message: "Contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Contain at least one special character.",
  })
  .trim(),
  bio:z
  .string()
  .min(2, { message: "Name must be at least 2 characters long." })
  .trim(),
  address1:z
  .string()
  .min(2, { message: "Name must be at least 2 characters long." })
  .trim(),
  address2:z
  .string()
  .min(2, { message: "Name must be at least 2 characters long." })
  .trim(),
  city:z
  .string()
  .min(2, { message: "Name must be at least 2 characters long." })
  .trim(),
  country:z
  .string()
  .min(2, { message: "Name must be at least 2 characters long." })
  .trim(),
  zipCode: z
    .string()
    .min(5, { message: "must be 5 characters long" })
    .regex(/[0-9]/, { message: "Please enter vaild zipcode." })
});
