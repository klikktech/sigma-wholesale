import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import React, { Suspense, useEffect, useState } from "react";
import ProductsCarousel from "../ProductsCarousel";

const Tabview = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/products?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Received data:", data);
        setProducts(data.content);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [category]);

  return (
    <div className="container mx-auto">
      <ProductsCarousel>
        {products.map((item: any, index: any) => (
          <div
            className="embla__slide flex embla-slide w-full justify-center"
            key={item.id}
          >
            <Suspense fallback={<SkeletonProductCard />}>
              <ProductCard
                img={item.displayImage}
                title={item.name}
                price={"$" + item.price}
                details={item.details}
                stockStatus={item.status}
              />
            </Suspense>
          </div>
        ))}
      </ProductsCarousel>
    </div>
  );
};

export default Tabview;
