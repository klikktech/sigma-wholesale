import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import React, { Suspense } from "react";
import ProductsCarousel from "../ProductsCarousel";
import { axios } from "@/lib/axios";
import Link from "next/link";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/urls";
import { Button, Spacer, user } from "@nextui-org/react";
import UnauthorizedError from "@/components/molecules/Error";

const NewArrivals = async ({ user }: { user: any }) => {

  const { data, error } = await axios.products.getNewArrivals();
  if (error) {
    if (error.message?.includes('Unauthorised')) {
      return <UnauthorizedError />
    } else {
      throw new Error(error.message)
    }
  }

  const productElements = data?.map((item: any, index: any) => (
    <div
      className="embla__slide flex embla-slide w-full justify-center"
      key={index}
    >
      <Suspense fallback={<SkeletonProductCard />}>
        <ProductCard
          user={user}
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
    <section
      className="w-full p-4 flex flex-col gap-4"
      id="new-arrivals-section"
    >
      <div className="">
        <h2 className="text-2xl font-bold">NEW ARRIVALS</h2>
      </div>
      <ProductsCarousel>{productElements}</ProductsCarousel>
      <div className="flex justify-center">
        <Button
          as={Link}
          href={PRODUCTS_PAGE_ROUTE}
          color="primary"
          className="text-black hover:bg-primary-600 px-6 py-2"
        >
          View More
        </Button>
      </div>
    </section>
  );
};

export default NewArrivals;