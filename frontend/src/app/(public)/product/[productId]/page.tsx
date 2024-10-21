import ProductView from "@/components/organisms/ProductView";

interface Props {
  params: {
    productId: string;
  };
}

const ProductDetails = (props: Props) => {
  return (
    <>
      <ProductView />
    </>
  );
};
export default ProductDetails;
