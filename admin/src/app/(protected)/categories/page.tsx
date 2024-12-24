import Table from "@/components/organisms/Table";
import { CATEGORY_COLUMNS, renderCategoryTableCell } from "./columns";
import { axios } from "@/lib/axios";
import Button from '@/components/atoms/Button';
import { Link } from "@nextui-org/react";
import { ADD_CATEGORY_PAGE_ROUTE } from "@/utils/routes";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { page?: string; keyword?: string };
}

const CateroriesPage = async ({ searchParams }: Props) => {
  // const page = searchParams.page ? parseInt(searchParams.page) : 0;
  // const size = 20;
  const keyword = searchParams.keyword || '';
  const response = keyword
    ? await axios.categories.getSearchCategoryList(keyword)
    : await axios.categories.getCategoryList();

  const { data, error } = response;
  console.log(data, "data")
  if (error) {
    console.error("API Error:", error);
  }

  // Transform the data to include a unique identifier
  const transformedData = (keyword ? [data] : data).map((category: any) => ({
    ...category,
    id: category.slug || category.name // Using slug or name as a unique identifier
  }));

  return (
    <>
      <section className="py-2">
        <div className="container">
          <Table
            data={transformedData}
            columns={CATEGORY_COLUMNS}
            headerContent={
              <>
                <Link href={ADD_CATEGORY_PAGE_ROUTE}>
                  <Button
                    endContent={
                      <span className="material-symbols-rounded">add</span>
                    }
                  >
                    Add Category
                  </Button>
                </Link>
              </>
            }
            itemsKey="id"
            searchPlaceholder="Search category by category name"
            type="categories"
            totalPages={data?.totalPages || 0}
            currentPage={0}
            size={20}
            searchkey={keyword}
            renderCell={renderCategoryTableCell}
          />
        </div>
      </section>
    </>
  );
};

export default CateroriesPage;
