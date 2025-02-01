import { z } from "zod";

export const SignInFormValidator = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long" })
    .trim(),
});

export const UserFormValidator = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .trim(),
  lastname: z
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
  storeAddress: z
    .string()
    .min(2, { message: "Address must be at least 2 characters long." })
    .trim(),
  storeState: z
    .string()
    .min(2, { message: "State must be at least 2 characters long." })
    .trim(),
  storeCity: z
    .string()
    .min(2, { message: "City must be at least 2 characters long." })
    .trim(),
  storeZip: z
    .string()
    .min(5, { message: "Zipcode must be 5 characters long." })
    .trim(),
});

export const EditUserFormValidator = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .trim(),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .trim(),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  role: z.string().min(2, { message: "Role can't be empty." }).trim(),
  phone: z
    .string()
    .min(10, { message: "Phone must be 10 characters long" })
    .regex(/[0-9]/, { message: "Please enter vaild Phone number." })
    .nullable(),
  storeAddress: z
    .string()
    .min(2, { message: "Address must be at least 2 characters long." })
    .trim(),
  storeState: z
    .string()
    .min(2, { message: "State must be at least 2 characters long." })
    .trim(),
  storeCity: z
    .string()
    .min(2, { message: "City must be at least 2 characters long." })
    .trim(),
  storeZip: z
    .string()
    .min(5, { message: "Zipcode must be 5 characters long." })
    .trim(),
});

export const ProductFormValidator = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters long." })
    .trim(),
  salePrice: z.coerce
    .number({ message: "Sale price must be a number" })
    .min(2, { message: "Sale price can't be less than 0" }),
  price: z.coerce
    .number({ message: "Price must be a number" })
    .min(2, { message: "Price can't be less than 0" }),
  sku: z
    .string()
    .min(2, { message: "SKU must be at least 2 characters long." })
    .trim(),
  // details: z
  //   .string()
  //   .min(2, { message: "Details must be at least 2 characters long." })
  //   .trim(),
  brand: z
    .string()
    .min(2, { message: "Brand must be at least 2 characters long." })
    .trim(),
  categories: z
    .array(z.string())
    .min(1, { message: "Please select at least one category." }),
  // subCategory: z
  // .string()
  // .min(2, { message: "Please select at least one sub category." })
  // .trim(),
  productType: z
    .string()
    .min(2, { message: "Product type must be at least 2 characters long." })
    .trim(),
  stockQuantity: z.coerce
    .number({ message: "Stock quantity must be a number" })
    .min(2, { message: "Stock quantity can't be less than 0" }),
  caseQuantity: z.coerce
    .number({ message: "Case quantity must be a number" })
    .min(2, { message: "Case quantity can't be less than 0" }),
  boxQuantity: z.coerce
    .number({ message: "Box quantity must be a number" })
    .min(2, { message: "Box quantity can't be less than 0" }),
  displayStatus: z
    .string()
    .min(2, { message: "Display Status must be at least 2 characters long." })
    .trim(),
  description: z
    .string()
    .min(2, { message: "Address must be at least 2 characters long." })
    .trim(),
  isOnSale: z.coerce.boolean().optional(),
  status: z.string().optional(),
});

// const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/mov",
  "video/avi",
  "application/octet-stream",
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
      ".jpg, .jpeg, .png and .webp .mp4, .webm, .mov, .avi files are accepted."
    ),

  images: z
    .array(z.any())
    .nonempty("Please upload at least one image.")
    .refine(
      (files) =>
        files.every((file) => file.size > 0 && file.name !== undefined),
      "One or more files are invalid or empty."
    ),
});
export const EditProductImagesValidator = z.object({
  displayImage: z
    .any()
    .nullable()
    .refine((file) => {
      if (!file) return true; // Allow null for existing images
      if (file.size === 0) return false;
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, ".jpg, .jpeg, .png and .webp files are accepted."),

  images: z.array(z.any()).refine((files) => {
    if (files.length === 0) return true; // Allow empty array for existing images
    return files.every(
      (file) => file.size > 0 && ACCEPTED_IMAGE_TYPES.includes(file.type)
    );
  }, "One or more files are invalid or empty."),
});
