'use client'

import { PRODUCT_VIEW_PAGE_ROUTE } from "@/utils/urls";
import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  img: string;
  title: string;
  price: string;
  details: string;
  stockStatus: string;
  user?:any
}

const stockChipColorMap = {
  instock: "success",
  outofstock: "danger",
} as const;
const ProductCard = (props: Props) => {

  return (
    <div className="w-60 group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out border border-gray-100 overflow-hidden h-full">
      <div className="relative h-60 aspect-square overflow-hidden bg-gray-50">
        <Image
          className="w-full h-full text-center object-cover transform group-hover:scale-105 transition-transform duration-500"
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          src={props.img}
          alt={props.title}
          priority
        />
        <Chip
          className={`
            capitalize absolute top-3 right-3 shadow-sm
            ${props.stockStatus === 'instock' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
            }
          `}
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

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="h-10 text-sm font-medium text-gray-900 line-clamp-2 flex-grow">
            {props.title}
          </h3>
          {props.user && (
            <p className="text-lg font-semibold text-gray-900 whitespace-nowrap">
              {props.price}
            </p>
          )}
        </div>

        <div className="mt-auto">
          <Button 
            as={Link}
            href={PRODUCT_VIEW_PAGE_ROUTE(props.details)}
            className="w-full bg-primary hover:bg-primary-600 transform transition-all duration-300 hover:-translate-y-1"
            aria-label={`Shop now for ${props.title}`}
          >
            <span className="flex items-center justify-center gap-2 text-black">
              Shop Now
              <span className="material-symbols-rounded text-lg">
                arrow_forward
              </span>
            </span>
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default ProductCard;
