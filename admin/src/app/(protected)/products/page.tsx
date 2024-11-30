import Table from "@/components/organisms/Table";
import { PRODUCT_COLUMNS, renderCell } from "./columns";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { axios } from "@/lib/axios";
import { ADD_PRODUCT_PAGE_ROUTE } from "@/utils/routes";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { page?: string; keyword?: string };
}


const ProductsPage = async ({ searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 0;
  const size = 20;
  const keyword = searchParams.keyword || '';
  const response = keyword
    ? await axios.products.getSearchProductsList(keyword, page, size)
    : await axios.products.getAllProducts(page, size);

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
            data={data.content || []}
            columns={PRODUCT_COLUMNS}
            headerContent={
              <>
                <Link href={ADD_PRODUCT_PAGE_ROUTE}>
                  <Button
                    endContent={
                      <span className="material-symbols-rounded">add</span>
                    }
                  >
                    Add Product
                  </Button>
                </Link>
              </>
            }
            itemsKey="sku"
            searchPlaceholder="Search products..."
            type="products"
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

export default ProductsPage;
