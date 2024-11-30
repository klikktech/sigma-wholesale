import CartList from "@/components/organisms/CartList/Index";
import { axios } from "@/lib/axios";

const OrdersPage = async () => {
  const { data, error } = await axios.products.getCartList();
  if (error) {
    throw new Error(error.message)
  }
  console.log(data, "in page cartlist")
  return (
    <div>
      <CartList cartItemsList={data.cartItems} />
    </div>
  );
};

export default OrdersPage;
