'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import "./styles.css";
type Props = {
  elements: React.ReactNode[];
};

const MainCarousel = ({ elements }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true },[Autoplay()])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className='embla mx-auto mt-12'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container h-full'>
        {elements.map((element, index) => (
            <div key={index} className='embla__slide flex items-center justify-center'>
              {element}
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-between'>
      <span
          className="material-symbols-rounded prev"
          onClick={scrollPrev}
        >
          chevron_left
        </span>
        <span
          className="material-symbols-rounded next"
          style={{ zIndex: 2 }}
          onClick={scrollNext}
        >
          chevron_right
        </span>
      </div>
    </div>
  )
}
export default MainCarousel