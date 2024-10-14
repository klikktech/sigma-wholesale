import CarouselContent from '@/components/molecules/CarouselContent';
import NewArrivals from '@/components/organisms/NewArrivals';
import Review from '@/components/organisms/Reviews';
import Tabs from '@/components/organisms/Tabs';
import React from 'react';
import Tabview from '@/components/organisms/Tabview';

const HomePage = () => {
 return (
  <div className='px-32'>
  <CarouselContent/>
  <NewArrivals/>
  <Tabview />
  {/* <Review /> */}
  </div>
 )
};

export default HomePage;
