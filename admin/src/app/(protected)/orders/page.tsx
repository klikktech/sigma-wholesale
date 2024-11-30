import Table from "@/components/organisms/Table";
import { ORDER_COLUMNS, renderCell } from "./columns";
import { axios } from "@/lib/axios";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { page?: string; keyword?: string };
}

const OrdersPage = async ({ searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 0;
  const size = 20;
  const keyword = searchParams.keyword || '';
  const response = keyword
    ? await axios.orders.getSearchOrdersList(keyword)
    : await axios.orders.getAllOrders(page, size);

  const { data, error } = response;
  console.log(data, "data")
  if (error) {
    console.error("API Error:", error);
  }

  return (
    <>
      <section className="py-2">
        <div className="container">
          <Table
            data={keyword? [data]|| []: data.content || []}
            columns={ORDER_COLUMNS}
            headerContent={
              <></>
            }
            itemsKey="orderId"
            searchPlaceholder="Search order by order id"
            type="orders"
            totalPages={data.totalPages}
            currentPage={page}
            size={size}
            searchkey={keyword}
            renderCell={renderCell}
          />
        </div>
      </section>
    </>
  );
};

export default OrdersPage;
