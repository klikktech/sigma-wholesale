'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import "./styles.css";

type Props = {
  elements: React.ReactNode[];
};

const ProductsCarousel = ({ elements }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({slidesToScroll: 2, loop: true }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!elements ) {
    return <div>No items to display</div>;
  }
  else{
    return (
        <div className='embla mx-auto mt-12'>
          <div className='embla__viewport' ref={emblaRef}>
            <div className='embla__container test1 h-full'>
              {elements.map((element, index) => (
                <div key={index} className='embla__slide test2 flex items-center justify-center'>
                  {element}
                </div>
              ))}
            </div>
          </div>
    
          <div className='flex justify-between'>
            <span className="material-symbols-rounded prev2" onClick={scrollPrev}>
              chevron_left
            </span>
            <span className="material-symbols-rounded next" onClick={scrollNext}>
              chevron_right
            </span>
          </div>
        </div>
      );
  }
}
export default ProductsCarousel;