import CarouselContent from '@/components/organisms/CarouselContent';
import NewArrivals from '@/components/organisms/NewArrivals';
import Tabs from '@/components/organisms/Tabs';
import React from 'react';

const HomePage = () => {
  return (
    <div className=''>
      <CarouselContent />
      {/* <NewArrivals /> */}
      <Tabs />
    </div>
  )
};

export default HomePage;
