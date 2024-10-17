"use client";
import {
  Avatar,
  Button,
  Image,
  Input,
  ScrollShadow,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import "./style.css";
import { color } from "framer-motion";

const ProductView = () => {
  const reviewList = [
    {
      name: "Alice",
      timeStamp: "10 Jan, 2024",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      comments:
        "Love the quality of the bong I purchased. Smooth transaction and fast shipping.",
    },
    {
      name: "Bob",
      timeStamp: "15 May, 2024",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      comments:
        "Great selection of pipes, found exactly what I was looking for.",
    },
    {
      name: "Charlie",
      timeStamp: "21 Aug, 2024",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      comments:
        "Amazing customer service and the vaporizer works like a charm.",
    },
  ];

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
    <>
      <div className="flex gap-x-10 items-center">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <Image className="rounded-2xl" src={selectedImage} alt="" />
          <ScrollShadow>
            <div className="images-list flex gap-4">
              {quantities.map((item) => (
                <Image
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
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-2xl font-bold my-3">
            NIRVANA THCA+THCP LIQUID DIAMOND PREROLL 2G 10CT/JAR
          </p>
          <p className="text-base my-3">
            Discover our exclusive collection of premium smoking gear.
          </p>
          <p className="text-xl font-bold my-3">$34</p>
          <p className="text-large font-bold my-3">Available Options</p>
          {quantities.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-3"
            >
              <div className="md:w-2/3">
                <div className="flex gap-x-3 ">
                  <Image
                    className="rounded-full"
                    width="16%"
                    src={item.image}
                    alt=""
                  />
                  <div className="">
                    <p className="text-sm">
                      Discover our exclusive collection of premium smoking gear.
                    </p>
                    <p className="font-extralight text-sm">$34</p>
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
          <Button className="w-1/3 mt-3" color="primary">
            <span className="material-symbols-rounded">shopping_cart</span>
            Add to cart
          </Button>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="ml-1 flex items-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span className="material-symbols-rounded star" key={`review-${rating}`}>star</span>
            ))}
          </div>
          <Textarea
            label="Review"
            placeholder="Write your review"
            className="w-full"
          />
          <div className="flex gap-4">
            <Input
              className="w-full md:w-1/2"
              type="text"
              label="Name"
              placeholder="Enter your name"
            />
            <Input
              className="w-full md:w-1/2"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {reviewList.map((items) => (
            <div className="flex flex-col gap-1" key={items.name}>
              <div className="flex gap-4 items-center">
                <Avatar src={items.avatar} />
                <div className="">
                  <p>{items.name}</p>
                  <p className="text-xs">{items.timeStamp}</p>
                </div>
              </div>
              <div className="ml-1 flex items-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <span
                    className="material-symbols-rounded star"
                    key={`${items.name}-${rating}`}
                  >
                    star
                  </span>
                ))}
              </div>
              <div>{items.comments}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductView;
