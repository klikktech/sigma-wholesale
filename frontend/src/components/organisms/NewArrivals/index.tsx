import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import React, { Suspense } from "react";
import ProductsCarousel from "../ProductsCarousel";
import Button from "@/components/atoms/Button";
import first1 from "../../../../public/images/product_1.webp"
import first2 from "../../../../public/images/product_2.webp"
import first3 from "../../../../public/images/product_3.webp"
import first4 from "../../../../public/images/product_4.webp"
import first5 from "../../../../public/images/product_5.png"
import first6 from "../../../../public/images/product_6.webp"
import first7 from "../../../../public/images/product_7.jpg"
import first8 from "../../../../public/images/product_8.jpg"

const images = [first1, first2, first3, first4, first5, first6, first7, first8]

// Async function in the component for server-side data fetching
const NewArrivals = async () => {
  let products:any = [];
  
  // try {
  //   const res: any = await request.getAllProducts();
  //   if (res && res.data) {
  //     products = res.data;
  //   } else {
  //     return <div>No products available</div>;
  //   }
  // } catch (error) {
  //   console.error("Error fetching products:", error);
  //   return <div>Error fetching products</div>;
  // }

  const productElements = products.map((item: any, index:any) => (
    <div className="embla__slide flex embla-slide w-full" key={item.id}>
        <Suspense fallback={<SkeletonProductCard />}>
          <ProductCard
            img={item.img}
            title={item.title}
            price={"$" + item.price}
            link = {`/product/${item.id}`}
          />
        </Suspense>
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
