import OrderCards from "@/components/organisms/ViewOrders";
import { axios } from "@/lib/axios";

const OrdersPage = async () => {
    const { data: ordersList, error: ordersError } = await axios.products.getOrdersList();
  let totalCount = 0
    if (ordersError) {
      throw new Error(ordersError.message);
    }

    const ordersWithItems = await Promise.all(
      ordersList.map(async (order: any) => {
        const { data: itemsList, error: itemsError } = await axios.products.getOrderItemsList(order.id);
        if (itemsError) {
          throw new Error(itemsError.message);
        }
        itemsList.map((item:any)=>{
          totalCount += item.quantity
        })
        return { ...order, itemsList , totalCount};
      })
    );
    console.log(ordersWithItems, "ordersWithItems")

    return (
      <div>
        <h1>Your Orders</h1>
        <OrderCards orders={ordersWithItems}/>
      </div>
    );
};

export default OrdersPage;
