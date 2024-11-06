import CheckOut from "@/components/organisms/CheckOut";
import { axios } from "@/lib/axios";

const CheckOutPage = async () => {
    const { data, error } = await axios.products.getCartList();
    if(error){
      throw new Error(error.message)
    }  
  return (
    <div>
      <CheckOut cartItemsList={data.cartItems} totalCost={data.price} discount={data.discount} tax={data.tax} />
    </div>
  );
};

export default CheckOutPage;
