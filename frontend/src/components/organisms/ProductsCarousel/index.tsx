"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./styles.css";

type Props = {
  children: React.ReactNode;
};

const ProductsCarousel = ({ children }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { slidesToScroll: 2, loop: true },
    [Autoplay()]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla-container">
      <div className="embla embla-content">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container embla-inner-container">
            {children}
          </div>
        </div>
      </div>
      <span className="material-symbols-rounded prev2" onClick={scrollPrev}>
        chevron_left
      </span>
      <span className="material-symbols-rounded next2" onClick={scrollNext}>
        chevron_right
      </span>
    </div>
  );
};
export default ProductsCarousel;
