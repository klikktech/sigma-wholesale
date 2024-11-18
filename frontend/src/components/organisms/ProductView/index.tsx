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
import Image from "next/image";
import Video from "@/components/atoms/Video";
import { toast } from "react-toastify";
import { HOME_PAGE_ROUTE } from "@/utils/urls";
import { useRouter } from "next/navigation";

const ProductView = ({ productDetails }: { productDetails: ProdDetails }) => {

  const setCartCount = useCartStore((state) => state.setCartCount);
  const [selectedImage, setSelectedImage] = useState(productDetails.displayImage?.imageUrl);

  const [state, formAction] = useFormState(async (state: undefined | Message, formData: FormData) => {
    const result = await addCartAction(state, formData, productDetails);
    if (result?.success) {
      setCartCount(result.totalCount);
    }
    return result;
  }, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success("Added to cart successfully!");
      router.push(HOME_PAGE_ROUTE);
    }
  }, [state]);

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
      <div className="p-8 md:p-10 lg:p-12">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <p className="text-2xl font-bold mb-1">
              {productDetails.name}
            </p>
          </div>
          <p className="text-3xl text-red-500 font-bold">${productDetails.price}</p>
        </div>
        <form action={formAction}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
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
            <div className="md:w-1/2 w-full flex flex-col gap-4">
              <Image
                className="rounded-2xl w-full"
                src={selectedImage}
                alt=""
                layout="responsive"
                width={100}
                height={100}
              />
              <ScrollShadow>
                <div className="images-list flex gap-4 overflow-x-auto">
                  {productDetails.images.map((item: { type: string; imageUrl: string }, index: number) => {
                    switch (item.type) {
                      case "IMAGE":
                        return (
                          <Image
                            className="rounded-xl"
                            width={100}
                            height={100}
                            key={index}
                            src={item.imageUrl}
                            alt=""
                            onClick={() => setSelectedImage(item.imageUrl)}
                          />
                        );
                      case "VIDEO":
                        return <Video key={index} src={item.imageUrl} />;
                      default:
                        return null;
                    }
                  })}
                </div>
              </ScrollShadow>
              <Button className="w-full mt-3 px-3" color="primary" type='submit'>
                <span>Add to cart</span>
                <span className="material-symbols-rounded">shopping_cart</span>
              </Button>
            </div>
          </div>
        </form>

        <p className="text-red-500 text-left">{state && <FormMessage message={state} />}</p>
        <Spacer y={3} />
      </div>
    </>
  );
};

export default ProductView;
