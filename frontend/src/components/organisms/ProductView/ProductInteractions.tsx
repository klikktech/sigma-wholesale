'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Message, ProdDetails } from "@/utils/types";
import { useFormState } from "react-dom";
import { addCartAction } from "../../../app/(public)/products/[productId]/action";
import { useCartStore } from '@/store/cartStore';
import { toast } from "react-toastify";
import { HOME_PAGE_ROUTE } from "@/utils/urls";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductInteractionsProps {
  productDetails: ProdDetails;
}

const ProductInteractions = ({ productDetails }: ProductInteractionsProps) => {
  const setCartCount = useCartStore((state) => state.setCartCount);
  const router = useRouter();
  const [quantities, setQuantities] = useState<number[]>(
    new Array(productDetails.variations.length).fill(0)
  );

  const [state, formAction] = useFormState(async (state: undefined | Message, formData: FormData) => {
    const storedCount = localStorage.getItem('cartCount');
    const currentCartCount = storedCount ? parseInt(storedCount, 10) : 0;
    const storedPrice = localStorage.getItem('cartPrice');
    const currentCartPrice = storedPrice ? parseFloat(storedPrice) : 0;
    const result = await addCartAction(state, formData, productDetails, currentCartCount, currentCartPrice);
    if (result?.success) {
      setCartCount(result.totalCount,result.totalPrice);
    }
    return result;
  }, undefined);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success("Added to cart successfully!");
      router.push(HOME_PAGE_ROUTE);
    }
  }, [state]);

  const handleIncrement = (index: number) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const handleDecrement = (index: number) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = Math.max(0, newQuantities[index] - 1);
      return newQuantities;
    });
  };

  return (
    <form action={formAction}>
      {productDetails.variations.length > 0 && <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <p className="text-2xl font-bold mb-5">Available Options</p>
          {productDetails.variations.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row justify-between items-center mb-3">
                  <div className="md:w-2/3">
                    <div className="flex gap-x-3">
                      <Image
                        className="rounded-md"
                        width={100}
                        height={100}
                        src={productDetails.displayImage?.imageUrl}
                        alt=""
                      />
                      <div>
                        <p className="text-sm">{item.variationName}</p>
                        <p className="font-semibold text-sm">${item.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3">
                    <div className="flex justify-center items-center gap-x-3">
                      <button
                        className="quantity-btn"
                        type="button"
                        onClick={() => handleDecrement(index)}
                      >
                        &minus;
                      </button>
                      <span className="quantity-value">{quantities[index]}</span>
                      <input name={item.details} value={quantities[index]} hidden />
                      <button
                        className="quantity-btn"
                        type="button"
                        onClick={() => handleIncrement(index)}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>}
      <Button className="w-full mt-3 px-3" color="primary" type='submit'>
        <span>Add to cart</span>
        <span className="material-symbols-rounded">shopping_cart</span>
      </Button>
    </form>
  );
};

export default ProductInteractions; 