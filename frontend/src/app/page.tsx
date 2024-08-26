import Carousel from "@/components/organisms/carousel";
import InitialCategories from "@/components/organisms/Initial-categories";
import Navbar from "@/components/organisms/Navbar";
import NewArrivals from "@/components/organisms/New-arrivals";
import Tabs from "@/components/organisms/Tabs";

const App = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <InitialCategories />
      <NewArrivals />
      <Tabs />
    </>
  );
};

export default App;
