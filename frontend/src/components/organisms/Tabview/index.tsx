import request from "@/api";
import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import Link from "next/link";
import React, { Suspense } from "react";
import ProductsCarousel from "../ProductsCarousel";

const Tabview = async () => {
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
      <ProductsCarousel>{productElements}</ProductsCarousel>
    </div>
  );
};

export default Tabview;
