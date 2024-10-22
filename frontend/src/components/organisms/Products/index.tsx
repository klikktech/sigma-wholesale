import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import { axios } from "@/lib/axios";
import { Pagination } from "@nextui-org/react";
import React, { Suspense } from "react";

const Products = async () => {
    let products: any = [];

      try {
        const res: any = await axios.products.getAllProducts();
        if (res && res.data) {
            console.log(res)
          products = res.data;
        } else {
          return <div>No products available</div>;
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        return <div>Error fetching products</div>;
      }

    return (
        <div className="container mx-auto">
            {
                products.map((item: any, index: any) => (
                    <div className="w-full" key={item.id}>
                        <Suspense fallback={<SkeletonProductCard />}>
                            <ProductCard
                                img={item.img}
                                title={item.title}
                                price={"$" + item.price}
                                link={`/product/${item.id}`}
                            />
                        </Suspense>
                    </div>
                ))
            }
            <Pagination showControls total={10} initialPage={1} />
        </div>
    );
};

export default Products;
