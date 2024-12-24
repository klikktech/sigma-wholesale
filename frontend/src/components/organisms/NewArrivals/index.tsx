import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import React, { Suspense } from "react";
import ProductsCarousel from "../ProductsCarousel";
import { axios } from "@/lib/axios";
import Link from "next/link";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/urls";
import { Button, Spacer } from "@nextui-org/react";

const NewArrivals = async ({user}:{user:any}) => {
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
    <section className="max-w-7xl mx-auto" id="new-arrivals-section">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">NEW ARRIVALS</h2>
      </div>
      <ProductsCarousel>{productElements}</ProductsCarousel>
      <div className="flex justify-center mt-4">
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
