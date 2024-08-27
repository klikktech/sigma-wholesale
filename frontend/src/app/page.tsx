// import Carousel from "@/components/organisms/Carousel";
import InitialCategories from "@/components/organisms/InitialCategories";
import Navbar from "@/components/organisms/Navbar";
import NewArrivals from "@/components/organisms/NewArrivals";
import Tabs from "@/components/organisms/Tabs";
import Carousel from "@/components/organisms/Test/Index";
import Test from "@/components/organisms/Test/Index";
import { Button } from "@nextui-org/react";

const App = () => {
  return (
    <>
      <Navbar />
      <Carousel
        // height="50rem"
        elements={[
          <div className="carousel-content 1 flex">
            <div className="w-full md:w-1/2">
              <img
                src={
                  "https://png.pngtree.com/thumb_back/fh260/background/20231005/pngtree-smoke-engulfed-vape-mod-in-stunning-3d-render-image_13568825.png"
                }
                alt=""
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-5xl font-bold my-3 pt-16">
                High Quality Smoking Accessories
              </p>
              <p className="text-base my-3">
                Discover our exclusive collection of premium smoking gear.
              </p>
              <div className="flex gap-4 my-3">
                <Button color="primary">Shop now</Button>
                <Button color="primary">Learn More</Button>
              </div>
            </div>
          </div>,
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfbAimTkoJWgje7eQPjbe8G7jUaGsNjdCUmw&s"
            }
            alt=""
          />,
          <div>
            <Button color="primary">Shop now</Button>
            <Button color="primary">Learn More</Button>
          </div>,
          <div>
            <Button color="primary">Shop now</Button>
          </div>
        ]}
      />      <InitialCategories />
      <NewArrivals />
      <Tabs />
    </>
  );
};

export default App;
