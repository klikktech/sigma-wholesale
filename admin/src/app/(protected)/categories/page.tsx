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
  const page = searchParams.page ? parseInt(searchParams.page) : 0;
  const size = 20;
  const keyword = searchParams.keyword || '';
  const response = keyword
    ? await axios.categories.getSearchCategoryList(keyword)
    : await axios.categories.getCategoryList(page,size);

  const { data, error } = response;
  console.log(data, "data")
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

  return (
    <>
      <section className="py-2">
        <div className="container">
          <Table
            data={keyword? data: data.content}
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
            itemsKey="slug"
            searchPlaceholder="Search category by category name"
            type="categories"
            totalPages={data?.totalPages || 0}
            currentPage={page}
            size={size}
            searchkey={keyword}
            renderCell={renderCategoryTableCell}
          />
        </div>
      </section>
    </>
  );
};

export default CateroriesPage;
