import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import { Button } from "@nextui-org/react";
import React, { Suspense } from "react";

const Carousel = () => {
    return <div className="container">
        <div className="flex gap-4">
            <div className="w-full md:w-1/2">
                <Suspense fallback={<SkeletonProductCard />}>
                <img src={"https://png.pngtree.com/thumb_back/fh260/background/20231005/pngtree-smoke-engulfed-vape-mod-in-stunning-3d-render-image_13568825.png"} alt="" />
                </Suspense>
            </div>
            <div className="w-full md:w-1/2">
                <Suspense fallback={<SkeletonProductCard />}>
                    <p className="text-5xl font-bold my-3 pt-16">High Quality Smoking Accessories</p>
                    <p className="text-base my-3">Discover our exclusive collection of premium smoking gear.</p>
                    <div className="flex justify-around my-3">
                        <div className="text-center md:w-1/2">
                            <Button color="primary">Shop now</Button>
                        </div>
                        <div className="text0center md:w-1/2">
                            <Button color="primary">Learn More</Button>
                        </div>
                    </div>
                </Suspense>
            </div>
        </div>
    </div>
};

export default Carousel;
