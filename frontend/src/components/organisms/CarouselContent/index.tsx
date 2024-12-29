import ScrollButton from "@/components/atoms/ScrollButton";
import { Button, Link } from "@nextui-org/react";
import React from "react";
import MainCarousel from "../MainCarousel";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/urls";
import { axios } from "@/lib/axios";
import { Banner } from "@/utils/types";
import UnauthorizedError from "@/components/molecules/Error";
import Video from "@/components/atoms/Video";
import Image from "next/image";


const CarouselContent = async () => {
  let banners: any = [];

  const { data, error } = await axios.banners.getBannersList();
  if (error) {
    if (error.message?.includes('Unauthorised')) {
      return <UnauthorizedError />
    } else {
      throw new Error(error.message)
    }
  }
  if (data) {
    banners = data;
  } else {
    return <div>No banners available</div>;
  }


  const elements = banners?.map((item: Banner, index: number) => (
    <div className="w-full" key={index}>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 max-h-80">
            {item.type === "IMAGE" ? (
              <Image
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={item.image}
                alt={item.title}
                priority
              />
            ) : (
              <Video 
                src={item.image}
              />
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left max-h-80">
          <h2 className="text-4xl font-bold leading-tight">{item.title}</h2>
          <p className="text-lg text-gray-600">{item.description}</p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Button color="primary" className="rounded-lg hover:bg-primary-300">
              <Link className="text-black text-md" href={PRODUCTS_PAGE_ROUTE}>
                Shop Now
              </Link>
            </Button>
            <ScrollButton
              color="primary"
              className="hover:bg-primary-600 text-md"
              scrollTargetId="tabs-section"
              type="button"
            >
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