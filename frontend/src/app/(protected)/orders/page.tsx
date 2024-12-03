import OrderCards from "@/components/organisms/ViewOrders";
import { axios } from "@/lib/axios";

const OrdersPage = async () => {
  const { data: ordersList, error: ordersError } = await axios.products.getOrdersList();
  console.log(ordersList, "ordersList")
  if (ordersError) {
    throw new Error(ordersError.message);
  }

  const ordersWithItems = await Promise.all(
    ordersList.map(async (order: any) => {
      const { data: itemsList, error: itemsError } = await axios.products.getOrderItemsList(order.id);
      console.log(itemsList, "itemsList")
      if (itemsError) {
        throw new Error(itemsError.message);
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
    <div>
      <OrderCards orders={ordersWithItems} />
    </div>
  );
};

export default OrdersPage;
