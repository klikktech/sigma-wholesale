import ProductView from "@/components/organisms/ProductView";
import { useParams } from "next/navigation";

interface Props {
  params: {
    productId: string;
  };
}

const ProductDetails = (props: Props) => {
  return (
    <>
      Product id - {props.params.productId}
      <ProductView />
    </>
  );
};
export default ProductDetails;
