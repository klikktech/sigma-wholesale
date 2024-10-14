import Button from "@/components/atoms/Button";
import MainCarousel from "@/components/organisms/MainCarousel";
import { CarouselInfo } from "@/utils/constants";
import React from "react";

const content = CarouselInfo

const CarouselContent = () => {
    const elements = content.map((item, index) => (
        <div key={index} className="flex gap-x-10">
          <div className="w-full md:w-1/2">
            <img className="rounded-2xl" src={item.image} alt={item.title} />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-5xl font-bold my-3">{item.title}</p>
            <p className="text-base my-3">{item.description}</p>
            <div className="flex gap-4 my-3">
              <Button color="primary">Shop now</Button>
              <Button color="primary" scrollTargetId="tabs-section">Learn More</Button>
            </div>
          </div>
        </div>
      ));
    
      return <MainCarousel elements={elements} />;
};

export default CarouselContent;
