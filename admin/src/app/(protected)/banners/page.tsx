import Banners from "@/components/organisms/Banners";
import { axios } from "@/lib/axios";

export const dynamic = 'force-dynamic';

const BannerPage = async () => {
    const { data, error } = await axios.banners.getBannersList();
    console.log(data, "BannerPage data")
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
        <Banners bannersList={data} />
    </div>
  );
};

export default BannerPage;
