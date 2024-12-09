import Brands from '@/components/organisms/Brands';
import CarouselContent from '@/components/organisms/CarouselContent';
import NewArrivals from '@/components/organisms/NewArrivals';
import Tabs from '@/components/organisms/Tabs';
import { getUser } from '@/lib/axios/session';
import React from 'react';

const HomePage = async () => {
  const user = await getUser()
  return (
    <div className=''>
      <CarouselContent />
      <NewArrivals user={user}/>
      <Tabs user={user}/>
      <Brands/>
    </div>
  )
};

export default HomePage;