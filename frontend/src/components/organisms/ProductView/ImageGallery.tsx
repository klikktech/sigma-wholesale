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
      <div className="relative w-full aspect-square">
        {selectedImage?.type === "IMAGE" ? (
          <Image
            className="rounded-xl object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            src={selectedImage.imageUrl}
            alt=""
          />
        ) : (
          <Video src={selectedImage.imageUrl} />
        )}
      </div>
      <ScrollShadow>
        <div className="images-list flex gap-4 overflow-x-auto">
          {imagesList.map((item, index) => {
            switch (item.type) {
              case "IMAGE":
                return (
                  <div className="relative w-24 aspect-square">
                  <Image
                    className="rounded-xl object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 384px"
                      key={index}
                      src={item.imageUrl}
                      alt={`image-${index.toString()}`}
                      onClick={() => setSelectedImage(item)}
                      priority
                    />
                  </div>
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