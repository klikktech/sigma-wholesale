import CarouselContent from '@/components/molecules/CarouselContent';
import NewArrivals from '@/components/organisms/NewArrivals';
import Tabs from '@/components/organisms/Tabs';
import Tabview from '@/components/organisms/Tabview';
import React from 'react';

const HomePage = () => {
 return (
  <div className=''>
  <CarouselContent/>
  <NewArrivals/>
  <Tabs>
    <div>
        <Tabview/>
    </div>
  </Tabs>
  </div>
 )
};

export default HomePage;
