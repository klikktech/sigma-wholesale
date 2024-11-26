"use server";

import { axios } from "@/lib/axios";
import { Message, ProdDetails } from "@/utils/types";

export const addCartAction = async (
  state: undefined | Message,
  formData: FormData,
  productDetails: ProdDetails,
  currentCartCount: number,
  currentCartPrice: number
) => {
  let variationArray: { variation: string; quantity: number; price: number; isOnlyProduct:boolean }[] = [];
  let totalPrice = currentCartPrice;
  let totalCount = currentCartCount;

  if (productDetails.variations.length > 0) {
    console.log(formData, "form data")
    formData.forEach((quantity, variation) => {
      if (typeof quantity === "string" && parseInt(quantity) > 0) {
        const matchedVariation = productDetails.variations.find(
          (item) => item.details === variation
        );

        if (matchedVariation) {
          const quantityNum = parseInt(quantity);
          const price = matchedVariation.price;
          variationArray.push({
            variation: matchedVariation.details,
            quantity: quantityNum,
            price: price,
            isOnlyProduct:false
          });
          totalCount += quantityNum;
          totalPrice += quantityNum * price;
        }
      }
    });
  }
  else{
    console.log("else",productDetails.price,typeof(productDetails.price))
    variationArray.push({
      variation: productDetails.details,
      quantity: 1,
      price: parseFloat(productDetails.price),
      isOnlyProduct:true
    });
    totalCount += 1;
    totalPrice += parseFloat(productDetails.price);
  }

  const payload = {
    quantity: totalCount ,
    price: parseFloat(totalPrice.toFixed(2)),
    productDetails: productDetails.details,
    cartItemsList: variationArray,
  };

  console.log(payload, "add to cart")
  const { data, status, error } = await axios.products.addToCart(payload);
  if (error) {
    console.log("error", error)
    return { error: error.message };
  }
  if (data && status === 200) {
    console.log("success", status, data)
    return { error: '', success: true, totalCount, totalPrice };
  }
};
