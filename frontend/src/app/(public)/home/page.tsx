import Brands from '@/components/organisms/Brands';
import CarouselContent from '@/components/organisms/CarouselContent';
import NewArrivals from '@/components/organisms/NewArrivals';
import Tabs from '@/components/organisms/Tabs';
import { getUser } from '@/lib/axios/session';
import { Spacer } from '@nextui-org/react';
import React from 'react';

const HomePage = async () => {
  const user = await getUser()
  return (
    <div className=''>
      <CarouselContent />
      <Spacer y={10} />
      <NewArrivals user={user}/>
      <Spacer y={10} />
      <Tabs user={user}/>
      <Spacer y={10} />
      <Brands/>
    </div>
  )
};

export default HomePage;