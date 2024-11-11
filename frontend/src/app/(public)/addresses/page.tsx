import MyAddressList from "@/components/organisms/MyAddresses";
import { axios } from "@/lib/axios";

const CheckOutPage = async () => {
    // const { data, error } = await axios.products.getCartList();
    // if(error){
    //   throw new Error(error.message)
    // }  
  return (
    <div>
      <MyAddressList/>
    </div>
  );
};

export default CheckOutPage;
