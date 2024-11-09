'use client'
import React, { useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import { Message, ProdDetails } from "@/utils/types";
import { Button, ScrollShadow, Spacer } from "@nextui-org/react";
import { axios } from "@/lib/axios";
import { getUser } from "@/lib/axios/session";
import { addCartAction } from "../../../app/(public)/products/[productId]/action";
import { useFormState, useFormStatus } from "react-dom";
import FormMessage from "@/components/molecules/FormMessage";
import { useCartStore } from '@/store/cartStore';

const ProductView = ({ productDetails }: { productDetails: ProdDetails }) => {
  const setCartCount = useCartStore((state) => state.setCartCount);

  const [state, formAction] = useFormState(async (state: undefined | Message, formData: FormData) => {
    const result = await addCartAction(state, formData, productDetails);
    if (result?.success) {
      setCartCount(result.totalCount);
    }
    return result;
  }, undefined);

  const [quantities, setQuantities] = useState<number[]>(
    new Array(productDetails.variations.length).fill(0)
  );

  const handleIncrement = (index: number) => {
    setQuantities((prevQuantities: any) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const handleDecrement = (index: number) => {
    setQuantities((prevQuantities: any) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = Math.max(0, newQuantities[index] - 1);
      return newQuantities;
    });
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between">
          <div className="">
            <p className="text-2xl font-bold mb-1">
              {productDetails.name}
            </p>
          </div>
          <p className="text-3xl text-red-500 font-bold">${productDetails.price}</p>
        </div>
        <div className="flex gap-x-10">
          <form action={formAction}>
          <div className="w-full md:w-1/2">
            <p className="text-2xl font-bold mb-5">Available Options</p>
            {productDetails.variations.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-3">
                <div className="md:w-2/3">
                  <div className="flex gap-x-3 ">
                    <img
                      className="rounded-md"
                      width="20%"
                      src={productDetails.displayImage}
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
                    <input name={item.details} value={quantities[index]} hidden/>
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
          <div className="md:w-1/2 w-full flex flex-col gap-4">
            {/* <img className="rounded-2xl" src={selectedImage} alt="" />
          <ScrollShadow>
            <div className="images-list flex gap-4">
              {quantities.map((item) => (
                <img
                  className="rounded-xl"
                  width="24%"
                  key={item.id}
                  src={item.image}
                  alt=""
                  onClick={() => setSelectedImage(item.image)}
                />
              ))}
            </div>
          </ScrollShadow> */}
            <Button className="w-full mt-3" color="primary" type='submit'>
              <span>Add to cart</span>
              <span className="material-symbols-rounded">shopping_cart</span>
            </Button>
          </div>
          </form>
        </div>
        <p className="text-red-500 text-left">{state && <FormMessage message={state} />}</p>
        <Spacer y={3} />
      </div>
    </>
  );
};

export default ProductView;
