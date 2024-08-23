import Button from "@/components/atoms/Button";
import ProductCard from "@/components/molecules/ProductCard";
import SkeletonProductCard from "@/components/molecules/ProductCard/SkeletonCard";
import Navbar from "@/components/organisms/Navbar";
import { Suspense } from "react";

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<SkeletonProductCard />}>
        <ProductCard
          img={"https://nextui.org/images/album-cover.png"}
          title={"Lemon"}
          price={"$10.00"}
        />
      </Suspense>
      <Button color="primary">ks me</Button>
    </>
  );
};

export default App;
