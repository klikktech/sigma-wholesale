import Brands from "@/components/organisms/Brands";
import { axios } from "@/lib/axios";

export const dynamic = 'force-dynamic';

const BrandsPage = async () => {
    const { data, error } = await axios.brands.getBrandsList();
    if (error) {
      if (error.message?.includes('Unauthorised')) {
        throw new Error('UNAUTHORIZED', { cause: error.message });
      }
      else{
        throw new Error(error.message)
      }
    }
  return (
    <div>
        <Brands brands={data} />
    </div>
  );
};

export default BrandsPage;
