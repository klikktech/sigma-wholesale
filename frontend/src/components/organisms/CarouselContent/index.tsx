import ScrollButton from "@/components/atoms/ScrollButton";
import { CarouselInfo } from "@/utils/constants";
import { Button, Image, Link } from "@nextui-org/react";
import React from "react";
import MainCarousel from "../MainCarousel";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/urls";

const content = CarouselInfo;

const CarouselContent = () => {
  const elements = content.map((item, index) => (
    <div
      key={index}
      className="flex flex-col md:flex-row gap-x-10 items-center"
    >
      <div className="w-full md:w-1/2">
        <Image
          className="rounded-2xl w-full h-auto"
          src={item.image}
          alt={item.title}
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <p className="text-5xl font-bold my-3 text-center">{item.title}</p>
        <p className="text-base my-3 text-center">{item.description}</p>
        <div className="flex gap-4 my-3">
          <Button
            color="primary"
            className="rounded-lg hover:bg-primary-300"
          >
            <Link className="text-black" href={PRODUCTS_PAGE_ROUTE}>Shop now</Link>
          </Button>
          <ScrollButton color="primary" scrollTargetId="tabs-section">
            Learn More
          </ScrollButton>
        </div>
      </div>
    </div>
  ));

  return <MainCarousel elements={elements} />;
};

export default CarouselContent;
