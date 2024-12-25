import CartList from "@/components/organisms/CartList";
import { axios } from "@/lib/axios";
import { redirect } from 'next/navigation';
import { HOME_PAGE_ROUTE } from '@/utils/urls';

const OrdersPage = async () => {
  const { data, error } = await axios.products.getCartList();
  if (error) {
    if (error.message?.includes('Unauthorised')) {
      throw new Error('UNAUTHORIZED', { 
        cause: {
          code: 'Unauthorised',
          message: 'Your session has expired. Please log in again.'
        }
      });
    } else {
      throw new Error('ERROR', { 
        cause: {
          code: 'UNKNOWN',
          message: error.message
        }
      });
    }
}

  if (!data.cartItems || data.cartItems.length === 0) {
    redirect(HOME_PAGE_ROUTE);
  }

  return (
    <CartList cartItemsList={data.cartItems} />
  );
};

export default OrdersPage;
