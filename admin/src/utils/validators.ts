import { z } from "zod";

export const SignInFormValidator = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long" })
    .trim(),
});

export const UserFormValidator = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .trim(),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .trim(),
  role: z.string().min(2, { message: "Role can't be empty." }).trim(),
  phone: z
    .string()
    .min(10, { message: "Phone must be 10 characters long" })
    .regex(/[0-9]/, { message: "Please enter vaild Phone number." })
    .nullable(),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters long." })
    .trim(),
});

export const ProductFormValidator = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters long." })
    .trim(),
  minPrice: z.coerce
    .number({ message: "Min price must be a number" })
    .min(0, { message: "Min price can't be less than 0" }),
  maxPrice: z.coerce
    .number({ message: "Max price must be a number" })
    .min(2, { message: "Max price can't be less than 0" }),
  sku: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .trim(),
  commentStatus: z
    .string()
    .min(2, { message: "Address must be at least 2 characters long." })
    .trim(),
  isOnSale: z.coerce.boolean().optional(),
  status: z.string().optional(),
  // displayImage:  z
  // .any()
  // .refine((file) => {
  //   if (file.size === 0 || file.name === undefined) return false;
  //   else return true;
  // }, "Please update or add new image.")

  // .refine(
  //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // )
  // .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
});

const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ProductImagesValidator = z.object({
  displayImage: z
    .any()
    .refine((file) => {
      if (file.size === 0 || file.name === undefined) return false;
      else return true;
    }, "Please update or add new image.")

    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),

  images: z
    .array(z.any())
    .nonempty("Please upload at least one image.")
    .refine(
      (files) =>
        files.every((file) => file.size > 0 && file.name !== undefined),
      "One or more files are invalid or empty."
    )
    // .refine(
    //   (files) =>
    //     files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
    //   "All files must be of types: .jpg, .jpeg, .png, or .webp."
    // )
    // .refine(
    //   (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
    //   `Each file must be 5MB or smaller.`
    // ),
});
