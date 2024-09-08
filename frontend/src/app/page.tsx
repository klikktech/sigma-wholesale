// import Carousel from "@/components/organisms/Carousel";
import InitialCategories from "@/components/organisms/InitialCategories";
import Navbar from "@/components/organisms/Navbar";
import NewArrivals from "@/components/organisms/NewArrivals";
import ProductView from "@/components/organisms/ProductView";
import Tabs from "@/components/organisms/Tabs";
import Carousel from "@/components/organisms/Test";
import { BASE_URL } from "@/utils/urls";
import { Button } from "@nextui-org/react";

const App = () => {
  return (
    <>
      <Navbar />
      HEllO JS{BASE_URL}
      <Carousel
        // height="50rem"
        elements={[
          <>
            <div className="">
              <div className="carousel-content 1 flex gap-x-10">
                <div className="w-full md:w-1/2">
                  <img className="rounded-2xl"
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
              </div>
            </div>
          </>,
          <>
            <div className="">
              <div className="carousel-content 1 flex gap-x-10">
                <div className="w-full md:w-1/2">
                  <img className="rounded-2xl"
                    src={
                      "https://png.pngtree.com/thumb_back/fh260/background/20231005/pngtree-smoke-engulfed-vape-mod-in-stunning-3d-render-image_13568825.png"
                    }
                    alt=""
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-5xl font-bold my-3 pt-16">
                    Low Quality Smoking Accessories
                  </p>
                  <p className="text-base my-3">
                    Discover our exclusive collection of premium smoking gear.
                  </p>
                  <div className="flex gap-4 my-3">
                    <Button color="primary">Shop now</Button>
                    <Button color="primary">Learn More</Button>
                  </div>
                </div>
              </div>
            </div>
          </>,
          <>
            <div className="">
              <div className="carousel-content 1 flex gap-x-10">
                <div className="w-full md:w-1/2">
                  <img className="rounded-2xl"
                    src={
                      "https://png.pngtree.com/thumb_back/fh260/background/20231005/pngtree-smoke-engulfed-vape-mod-in-stunning-3d-render-image_13568825.png"
                    }
                    alt=""
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-5xl font-bold my-3 pt-16">
                    Quality Smoking Accessories
                  </p>
                  <p className="text-base my-3">
                    Discover our exclusive collection of premium smoking gear.
                  </p>
                  <div className="flex gap-4 my-3">
                    <Button color="primary">Shop now</Button>
                    <Button color="primary">Learn More</Button>
                  </div>
                </div>
              </div>
            </div>
          </>,
        ]}
      />
      <InitialCategories />
      <NewArrivals />
      <Tabs />
      {/* <ProductView/> */}
    </>
  );
};

export default App;
