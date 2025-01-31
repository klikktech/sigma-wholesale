"use server"
import { axios } from "@/lib/axios";

export async function updateBrand(payload: any) {
  const { data, status, error } = await axios.brands.updateBrand(payload);
  console.log(data,status,error, "updateBrand data")

  if (error) {
    return { error: error.message, success: false };
  }
  if (data && status === 200) {
    return { error: null, success: true };
  }
}

export async function createBrand(payload: any) {
  console.log(payload, "createBrand payload")
  const { data, status, error } = await axios.brands.createBrand(payload);
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