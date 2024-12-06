'use client'

import { useEffect, useState } from "react";
import { getUserDetails } from "./action";
import { PRODUCT_VIEW_PAGE_ROUTE } from "@/utils/urls";
import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";

import Link from "next/link";

interface Props {
  img: any;
  title: string;
  price: string;
  details: string;
  stockStatus: string
}

const stockChipColorMap = {
  instock: "success",
  outofstock: "danger",
};

const ProductCard = (props: Props) => {
  const [showPrice, setShowPrice] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { isAuthenticated } = await getUserDetails();
      setShowPrice(isAuthenticated);
      console.log(isAuthenticated,"isAuthenticated")
    };
    
    checkUser();
  }, []);

  return (
    <>
      <div className="max-w-xs min-w-60 bg-gray-100 text-black rounded-xl shadow-lg overflow-hidden h-full">
        <div className="relative h-48">
          <Image
            className="w-full h-full object-cover"
            fill
            sizes="100"
            src={props.img}
            alt={props.title}
          />
          <Chip
            className="capitalize text-white absolute top-2 right-2"
            color={
              stockChipColorMap[props.stockStatus as "instock" | "outofstock"] as
              | "success"
              | "danger"
            }
            size="sm"
            variant="solid"
          >
            {props.stockStatus === 'instock' ? 'IN STOCK' : 'OUT OF STOCK'}
          </Chip>
        </div>

        <div className="mt-2 p-4">
          <div className="flex justify-between h-full">
            <h3 className="text-sm font-semibold h-10 overflow-hidden line-clamp-2">{props.title}</h3>
            {showPrice && <p className="text-gray-400">{props.price}</p>}
          </div>
          <Button color="primary" className="w-full mt-4 rounded-lg hover:bg-primary-300">
            <Link className="w-full text-black py-2" href={PRODUCT_VIEW_PAGE_ROUTE(props.details)}>Shop Now</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
