import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import React, { Suspense } from "react";
import request from "@/api";

const InitialCategories = async () => {
  const res: any = await request.getAllProducts()
  // const data = await res.data
  return <div className="container mx-auto my-3">
    <div className="flex gap-x-2.5">
      {res.data.map((item: any) => (
        <div className="w-full md:w-1/4 ">
          <Suspense fallback={<SkeletonProductCard />}>
            <ProductCard
              img={"https://nextui.org/images/album-cover.png"}
              title={item.title}
              price={"$"+item.price}
            />
          </Suspense>
        </div>
      ))}
    </div>
  </div>
};

export default InitialCategories;
