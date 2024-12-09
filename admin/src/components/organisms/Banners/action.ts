"use server"
import { axios } from "@/lib/axios";

export async function addBanner(formData: FormData) {
  console.log(formData, "addBanner formData")
  const { data, status, error } = await axios.banners.addBanner(formData);
  console.log(data,status,error, "addBanner data")
  if (error) {
    return { error: error.message, success: false };
  }
  if (data && status === 200) {
    return { error: null, success: true };
  }
}

export async function deleteBanner(id: string) {
  const { data, status, error } = await axios.banners.deleteBanner(id);
  console.log(data,status,error, "deleteBanner data")

  if (error) {
    return { error: error.message, success: false };
  }
  if (data && status === 200) {
    return { error: null, success: true };
  }
}