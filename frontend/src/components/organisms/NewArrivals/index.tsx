import request from "@/api";
import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import Link from "next/link";
import React, { Suspense } from "react";
import ProductsCarousel from "../ProductsCarousel";
import Button from "@/components/atoms/Button";

// Async function in the component for server-side data fetching
const NewArrivals = async () => {
  let products = [];
  
  try {
    const res: any = await request.getAllProducts();
    if (res && res.data) {
      products = res.data;
    } else {
      return <div>No products available</div>;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>;
  }

  const productElements = products.map((item: any) => (
    <div className="embla__slide flex embla-slide w-full" key={item.id}>
      <Link href={`/product/${item.id}`}>
        <Suspense fallback={<SkeletonProductCard />}>
          <ProductCard
            img={"https://nextui.org/images/album-cover.png"}
            title={item.title}
            price={"$" + item.price}
          />
        </Suspense>
      </Link>
    </div>
  ));

  return (
    <div className="container mx-auto">
      <h1 className="my-2 text-xl">New Arrivals</h1>
      <ProductsCarousel>{productElements}</ProductsCarousel>
      <div className="text-center">
      <Button color="primary" className="mt-4 text-black py-2 rounded-lg hover:bg-primary-300">
        view more
      </Button>
      </div>

    </div>
  );
};

export default NewArrivals;
