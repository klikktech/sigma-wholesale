import OrderCards from "@/components/organisms/ViewOrders";
import { axios } from "@/lib/axios";

const OrdersPage = async () => {
  const { data: ordersList, error: ordersError } = await axios.products.getOrdersList();
  console.log(ordersList, "ordersList")
  if (ordersError) {
    if (ordersError.message?.includes('Unauthorised')) {
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
          message: ordersError.message
        }
      });
    }
  }


  const ordersWithItems = await Promise.all(
    ordersList.map(async (order: any) => {
      const { data: itemsList, error: itemsError } = await axios.products.getOrderItemsList(order.id);
      console.log(itemsList, "itemsList")
      if (itemsError) {
        if (itemsError.message?.includes('Unauthorised')) {
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
              message: itemsError.message
            }
          });
        }
      }
      let totalCount = 0;
      itemsList.map((item: any) => {
        totalCount += item.quantity
      })
      return { ...order, itemsList, totalCount };
    })
  );
  console.log(ordersWithItems, "ordersWithItems")

  return (
    <div className="py-8 w-full">
      <OrderCards orders={ordersWithItems} />
    </div>
  );
};

export default OrdersPage;
