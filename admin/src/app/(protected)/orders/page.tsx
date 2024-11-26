import Table from "@/components/organisms/Table";
import { ORDER_COLUMNS, renderCell } from "./columns";
import { axios } from "@/lib/axios";

export const dynamic = 'force-dynamic';

const OrdersPage = async () => {
  const { data, error } = await axios.orders.getAllOrders();
  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <section className="py-2">
        <div className="container">
          <Table
            searchable
            data={data || []}
            columns={ORDER_COLUMNS}
            headerContent={<></>}
            itemsKey="orderId"
            renderCell={renderCell}
          />
        </div>
      </section>
    </>
  );
};

export default OrdersPage;
