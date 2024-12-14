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
    <div
      key={index}
      className="flex flex-col md:flex-row gap-x-10 items-center"
    >
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center">
        {item.type === "IMAGE" && <Image
          className="rounded-2xl w-full h-80 object-cover"
          src={item.image}
          alt={item.title}
        />}
        {item.type === "VIDEO" &&
          <video className="rounded-2xl w-full h-80 object-cover" autoPlay={true} muted={true} loop={true}>
            <source src={item.image} type="video/mp4" />
            Your browser does not support the video tag.
          </video>}
      </div>
      <div className="w-full max-w-screen-lg text-balance md:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col items-center">
        <p className="text-5xl font-bold my-3 text-center overflow-hidden max-w-screen-lg line-clamp-4">{item.title}</p>
        <p className="text-base my-3 text-center overflow-hidden max-w-screen-lg line-clamp-4">{item.description}</p>
        <div className="flex gap-4 my-3">
          <Button
            color="primary"
            className="rounded-lg hover:bg-primary-300"
          >
            <Link className="text-black" href={PRODUCTS_PAGE_ROUTE}>Shop Now</Link>
          </Button>
          <ScrollButton color="primary" className="hover:bg-primary-600" scrollTargetId="tabs-section">
            Learn More
          </ScrollButton>
        </div>
      </div>
    </div>
  ));

  return <MainCarousel elements={elements} />;
};

export default CarouselContent;
