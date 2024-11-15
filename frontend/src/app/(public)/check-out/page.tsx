import CheckOut from "@/components/organisms/CheckOut";
import { axios } from "@/lib/axios";

const fetchAddresses = async (type: string) => {
  const { data, error } = await axios.users.getAddresses(type);
  if (error) {
      throw new Error(error.message);
  }
  
  const addressesWithId = data.map((address: any, index: number) => ({
    id: index + 1,
    ...address
  }));

  return addressesWithId;
};
const CheckOutPage = async () => {
    const { data, error } = await axios.products.getCartList();
    if(error){
      throw new Error(error.message)
    }
    const shippingAddresses = await fetchAddresses('shipping');
  return (
    <div>
      <CheckOut cartItemsList={data.cartItems} totalCost={data.price} discount={data.discount} tax={data.tax} shippingAddresses={shippingAddresses}/>
    </div>
  );
};

export default CheckOutPage;
