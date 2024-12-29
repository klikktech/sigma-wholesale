"use server"
import { axios } from "@/lib/axios";
import { redirect } from "next/navigation";

export const getCartCount = async () => {
    const { data, error } = await axios.products.getCartList();
    console.log(error, "getCartCount")
    if (error) {
      if (error.message?.includes('Unauthorized')) {
        redirect('/unauthorised')
      } else {
        throw new Error('ERROR', { 
          cause: {
            code: 'UNKNOWN',
            message: error.message
          }
        });
      }
  }
    if(!data?.cartItems || data?.cartItems?.length === 0){
      return {cartCount:0,cartPrice:0};
    }
    const cartCount = data?.cartItems?.reduce((acc:any, item:any) => acc + item.quantity, 0);
    const cartPrice = data?.cartItems?.reduce((acc:any, item:any) => acc + (item.variation?(item.variation.price * item.quantity):(parseInt(item.product.price)* item.quantity)) , 0);
    return {cartCount,cartPrice};
  }