import ScrollButton from "@/components/atoms/ScrollButton";
import { Button, Image, Link } from "@nextui-org/react";
import React from "react";
import MainCarousel from "../MainCarousel";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/urls";
import { axios } from "@/lib/axios";
import { Banner } from "@/utils/types";

const CarouselContent = async () => {
  let banners: any = [];

  try {
    const { data, error } = await axios.banners.getBannersList();
    if (data) {
      banners = data;
    } else {
      return <div>No banners available</div>;
    }
    if (error) return <div>Error fetching banners</div>;
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching banners</div>;
  }

  const elements = banners?.map((item: Banner, index: number) => (
    <div className="max-w-7xl mx-auto" key={index}>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          {item.type === "IMAGE" && (
            <Image
              className="rounded-lg w-full h-[400px] object-cover"
              src={item.image}
              alt={item.title}
            />
          )}
          {item.type === "VIDEO" &&
            <video className="rounded-2xl w-full h-80 object-cover" autoPlay={true} muted={true} loop={true}>
              <source src={item.image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
        </div>
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl font-bold leading-tight">{item.title}</h2>
          <p className="text-lg text-gray-600">{item.description}</p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Button
              color="primary"
              className="rounded-lg hover:bg-primary-300"
            >
              <Link className="text-black text-md" href={PRODUCTS_PAGE_ROUTE}>Shop Now</Link>
            </Button>
            <ScrollButton color="primary" className="hover:bg-primary-600 text-md" scrollTargetId="tabs-section" type="button">
              Learn More
            </ScrollButton>
          </div>
        </div>
      </div>
    </div>
  ));

  return <MainCarousel elements={elements} />;
};

export default CarouselContent;
