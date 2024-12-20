import CartList from "@/components/organisms/CartList";
import { axios } from "@/lib/axios";
import { redirect } from 'next/navigation';
import { HOME_PAGE_ROUTE } from '@/utils/urls';

const OrdersPage = async () => {
  const { data, error } = await axios.products.getCartList();
  if (error) {
    throw new Error(error.message)
  }

  if (!data.cartItems || data.cartItems.length === 0) {
    redirect(HOME_PAGE_ROUTE);
  }

  return (
    <CartList cartItemsList={data.cartItems} />
  );
};

export default OrdersPage;
