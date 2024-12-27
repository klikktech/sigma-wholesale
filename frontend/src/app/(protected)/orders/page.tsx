import OrderCards from "@/components/organisms/ViewOrders";
import UnauthorizedError from "@/components/molecules/Error";
import { axios } from "@/lib/axios";

const OrdersPage = async () => {
  const { data: ordersList, error: ordersError } = await axios.products.getOrdersList();
  console.log(ordersList, "ordersList")
  if (ordersError) {
    if (ordersError.message?.includes('Unauthorised')) {
      return <UnauthorizedError />
    } else {
      throw new Error(ordersError.message)
    }
  }


  const ordersWithItems = await Promise.all(
    ordersList.map(async (order: any) => {
      const { data: itemsList, error: itemsError } = await axios.products.getOrderItemsList(order.id);
      if (itemsError) {
        if (itemsError.message?.includes('Unauthorised')) {
          return <UnauthorizedError />
        } else {
          throw new Error(itemsError.message)
        }
      } 
      let totalCount = 0;
      itemsList.forEach((item: any) => {
        totalCount += item.quantity
      });
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
