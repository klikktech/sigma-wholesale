'use client'
import React, { useState } from "react";
import Image from "next/image";
import { ScrollShadow } from "@nextui-org/react";
import Video from "@/components/atoms/Video";

interface ImageGalleryProps {
  images: Array<{ type: string; imageUrl: string }>;
  initialImage: { type: string; imageUrl: string };
}

const ImageGallery = ({ images, initialImage }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const imagesList = [initialImage, ...images]

  return (
    <div className="w-full flex flex-col gap-4">
      {selectedImage?.type === "IMAGE" ? (
        <Image
          className="rounded-xl"
          width={100}
          height={100}
          src={selectedImage.imageUrl}
          layout="responsive"
          alt=""
        />
      ) : (
        <Video src={selectedImage.imageUrl} width="100%" height="100%" />
      )}
      <ScrollShadow>
        <div className="images-list flex gap-4 overflow-x-auto">
          {imagesList.map((item, index) => {
            switch (item.type) {
              case "IMAGE":
                return (
                  <Image
                    className="rounded-xl"
                    width={100}
                    height={100}
                    key={index}
                    src={item.imageUrl}
                    alt=""
                    onClick={() => setSelectedImage(item)}
                  />
                );
              case "VIDEO":
                return <Video key={index} src={item.imageUrl} onClick={() => setSelectedImage(item)} />;
              default:
                return null;
            }
          })}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default ImageGallery; 