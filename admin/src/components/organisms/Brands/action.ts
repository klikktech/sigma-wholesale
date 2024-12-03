"use server"
import { axios } from "@/lib/axios";

export async function updateBrand(formData: FormData) {
  const { data, status, error } = await axios.brands.updateBrand(formData);
  console.log(data,status,error, "updateBrand data")

  if (error) {
    return { error: error.message, success: false };
  }
  if (data && status === 200) {
    return { error: null, success: true };
  }
}

export async function createBrand(formData: FormData) {
  console.log(formData, "createBrand formData")
  const { data, status, error } = await axios.brands.createBrand(formData);
  console.log(data,status,error, "createBrand data")
  if (error) {
    return { error: error.message, success: false };
  }
  if (data && status === 200) {
    return { error: null, success: true };
  }
}

export async function deleteBrand(name: string) {
  const { data, status, error } = await axios.brands.deleteBrand(name);
  console.log(data,status,error, "deleteBrand data")

  if (error) {
    return { error: error.message, success: false };
  }
  if (data && status === 200) {
    return { error: null, success: true };
  }
}