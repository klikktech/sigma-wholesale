import Brands from "@/components/organisms/Brands";
import CarouselContent from "@/components/organisms/CarouselContent";
import NewArrivals from "@/components/organisms/NewArrivals";
import Tabs from "@/components/organisms/Tabs";
import { getUser } from "@/lib/axios/session";
import ScrollHandler from "@/components/molecules/ScrollHandler";

const HomePage = async () => {
  const user = await getUser();

  return (
    <div className="w-full flex flex-col gap-16">
      <div className="p-4 w-full ">
        <ScrollHandler />
        <CarouselContent />
      </div>
      <NewArrivals user={user} />
      <Tabs user={user} />
      <Brands />
    </div>
  );
};

export default HomePage;