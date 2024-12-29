import React from "react";
import "./style.css";
import { ProdDetails } from "@/utils/types";
import { Spacer } from "@nextui-org/react";
import ProductInteractions from "./ProductInteractions";
import ImageGallery from "./ImageGallery";


const ProductView = ({ productDetails }: { productDetails: ProdDetails }) => {
  return (
    <div className="p-8 md:p-10 lg:p-12">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          <p className="text-2xl font-bold mb-1">
            {productDetails.name}
          </p>
        </div>
        <p className="text-3xl text-red-500 font-bold">${productDetails.price}</p>
      </div>
      <Spacer y={3} />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <ProductInteractions productDetails={productDetails} />
        </div>
        <div className="w-full md:w-1/2">
          <ImageGallery 
            images={productDetails.images} 
            initialImage={{
              type: 'IMAGE',
              imageUrl: productDetails.displayImage?.imageUrl
            }}
          />
        </div>
      </div>
      <Spacer y={3} />
    </div>
  );
};

export default ProductView;
