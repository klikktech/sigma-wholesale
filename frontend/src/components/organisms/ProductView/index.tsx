"use client";
import {
  ScrollShadow,
} from "@nextui-org/react";
import React, { useState } from "react";
import "./style.css";
import ReviewList from "../ReviewsList";
import Link from "next/link";
import Button from "@/components/atoms/Button";

const ProductView = () => {
  const [quantities, setQuantities] = useState([
    {
      id: 1,
      image:
        "https://png.pngtree.com/thumb_back/fh260/background/20231005/pngtree-smoke-engulfed-vape-mod-in-stunning-3d-render-image_13568825.png",
      quantity: 0,
    },
    {
      id: 2,
      image:
        "https://png.pngtree.com/thumb_back/fw800/background/20231002/pngtree-3d-render-vape-mod-surrounded-by-billowing-smoke-image_13568822.png",
      quantity: 0,
    },
    {
      id: 3,
      image:
        "https://png.pngtree.com/thumb_back/fw800/background/20231004/pngtree-smoke-surrounds-3d-render-of-a-vape-mod-image_13568824.png",
      quantity: 0,
    },
    {
      id: 4,
      image:
        "https://image.slidesdocs.com/responsive-images/background/3d-representation-of-a-vaping-icon-powerpoint-background_fecf4dc12b__960_540.jpg",
      quantity: 0,
    },
    {
      id: 5,
      image:
        "https://s3.amazonaws.com/brandrepup/page_images/61069/original/144010250_presentation-wide.jpg?1640967522",
      quantity: 0,
    },
  ]);
  const [selectedImage, setSelectedImage] = useState(quantities[0]["image"]);

  const increaseQuantity = (id: any) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: any) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
          : item
      )
    );
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="">
          <p className="text-2xl font-bold mb-1">
            NIRVANA THCA+THCP LIQUID DIAMOND PREROLL 2G 10CT/JAR
          </p>
          <p className="text-base mb-5">
            Discover our exclusive collection of premium smoking gear.
          </p>
        </div>
        <p className="text-3xl text-red-500 font-bold">$34</p>
      </div>
      <div className="flex gap-x-10">
        <div className="w-full md:w-1/2">
          <p className="text-2xl font-bold mb-5">Available Options</p>
          {quantities.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-3"
            >
              <div className="md:w-2/3">
                <div className="flex gap-x-3 ">
                  <img
                    className="rounded-md"
                    width="20%"
                    src={item.image}
                    alt=""
                  />
                  <div className="">
                    <p className="text-sm">
                      Discover our exclusive collection of premium smoking gear.
                    </p>
                    <p className="font-semibold text-sm">$34</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="flex justify-center items-center gap-x-3">
                  <button
                    className="quantity-btn"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    &minus;
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <img className="rounded-2xl" src={selectedImage} alt="" />
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
          </ScrollShadow>
          <Button className="w-full mt-3" color="primary">
            <Link href={"/cart-list"} className="flex items-center">
            <span>Add to cart</span>
            <span className="material-symbols-rounded">shopping_cart</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <ReviewList/>
      </div>
    </div>
  );
};

export default ProductView;
