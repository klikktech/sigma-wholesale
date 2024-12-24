import ProductView from "@/components/organisms/ProductView";
import { axios } from '@/lib/axios';

const ProductDetails = async ({ params }: { params: { productId?: string } }) => {

  const details = params?.productId || ''
  const { data, error } = await axios.products.getProductDetails(details);
  if (error) {
    throw new Error(error.message)
  }
  return (
    <>
      <ProductView productDetails={data} />
    </>
  );
};
export default ProductDetails;
