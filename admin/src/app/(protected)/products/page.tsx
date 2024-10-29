import Breadcrumb from "@/components/molecules/BreadCrumb";
import Table from "@/components/organisms/Table";
import { PRODUCT_COLUMNS, renderCell } from "./columns";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { axios } from "@/lib/axios";
import { ADD_PRODUCT_PAGE_ROUTE } from "@/utils/routes";

const ProductsPage = async () => {
  const { data } = await axios.products.getAllProducts();
  // if(error) signOutAction()

  return (
    <>
      <Breadcrumb />
      <section className="py-2">
        <div className="container">
          <Table
            searchable
            data={data || []}
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
            renderCell={renderCell}
          />
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
