import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import React, { Suspense } from "react";
import ProductsCarousel from "../ProductsCarousel";
import { axios } from "@/lib/axios";
import Link from "next/link";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/urls";
import { Button } from "@nextui-org/react";

const NewArrivals = async () => {
  let products: any = [];

  try {
    const { data, error } = await axios.products.getNewArrivals();
    if (data) {
      products = data;
    } else {
      return <div>No products available</div>;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>;
  }

  const productElements = products.map((item: any, index: any) => (
    <div
      className="embla__slide flex embla-slide w-full justify-center"
      key={index}
    >
      <Suspense fallback={<SkeletonProductCard />}>
        <ProductCard
          img={item.displayImage?.imageUrl}
          title={item.name}
          price={item.price ? "$" + item.price : ""}
          details={item.details}
          stockStatus={item.status}
        />
      </Suspense>
    </div>
  ));

  return (
    <div className="container mx-auto">
      <h1 className="my-2 text-xl">NEW ARRIVALS</h1>
      <ProductsCarousel>{productElements}</ProductsCarousel>
      <div className="text-center">
        <Button
          color="primary"
          className="mt-4 text-black py-2 rounded-lg hover:bg-primary-300"
        >
          <Link href={PRODUCTS_PAGE_ROUTE}>View More</Link>
        </Button>
      </div>
    </div>
  );
};

export default NewArrivals;
