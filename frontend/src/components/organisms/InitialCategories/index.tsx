'use client'
import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import React, { Suspense } from "react";

const InitialCategories = () => {
    return <div className="container my-3">
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/4">
        <Suspense fallback={<SkeletonProductCard />}>
          <ProductCard
            img={"https://nextui.org/images/album-cover.png"}
            title={"Lemon"}
            price={"$10.00"}
          />
        </Suspense>
      </div>
      <div className="w-full md:w-1/4">
        <Suspense fallback={<SkeletonProductCard />}>
          <ProductCard
            img={"https://nextui.org/images/album-cover.png"}
            title={"Lemon"}
            price={"$10.00"}
          />
        </Suspense> 
      </div>
      <div className="w-full md:w-1/4">
        <Suspense fallback={<SkeletonProductCard />}>
          <ProductCard
            img={"https://nextui.org/images/album-cover.png"}
            title={"Lemon"}
            price={"$10.00"}
          />
        </Suspense>
      </div>
      <div className="w-full md:w-1/4">
        <Suspense fallback={<SkeletonProductCard />}>
          <ProductCard
            img={"https://nextui.org/images/album-cover.png"}
            title={"Lemon"}
            price={"$10.00"}
          />
        </Suspense> 
      </div>
    </div>
  </div>
};

export default InitialCategories;
