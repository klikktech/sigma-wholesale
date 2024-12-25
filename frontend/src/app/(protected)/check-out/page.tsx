import CheckOut from "@/components/organisms/CheckOut";
import { axios } from "@/lib/axios";
import { redirect } from "next/navigation";
import { HOME_PAGE_ROUTE } from "@/utils/urls";

const fetchAddresses = async (type: string) => {
  const { data, error } = await axios.users.getAddresses(type);
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
  
  const addressesWithId = data.map((address: any, index: number) => ({
    id: index + 1,
    ...address
  }));

  return addressesWithId;
};
const CheckOutPage = async () => {
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
    const shippingAddresses = await fetchAddresses('shipping');
  return (
    <div>
      <CheckOut cartItemsList={data.cartItems} totalCost={data.price} discount={data.discount || 0} tax={data.tax || 0} shippingAddresses={shippingAddresses}/>
    </div>
  );
};

export default CheckOutPage;
