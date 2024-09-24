import request from "@/api";
import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import Link from "next/link";
import React, { Suspense } from "react";

const NewArrivals = async () => {
  const res: any = await request.getAllProducts();
  // const data = await res.data
  return (
    <div className="container mx-auto">
      <h1 className="my-3 text-xl">New Arrivals</h1>
      <div className="flex gap-x-2.5">
        {res.data.map((item: any) => (
          <div className="w-full md:w-1/4" key={item.title}>
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
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
