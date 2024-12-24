import Table from "@/components/organisms/Table";
import { axios } from "@/lib/axios";
import { renderUserTableCell, USER_COLUMNS } from "./columns";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { ADD_USER_PAGE_ROUTE } from "@/utils/routes";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { page?: string; keyword?: string };
}

const UsersPage = async ({ searchParams }: Props) => {

  const page = searchParams.page ? parseInt(searchParams.page) : 0;
  const size = 20;
  const keyword = searchParams.keyword || '';
  const { data, error } = keyword
    ? await axios.users.getSearchUsersList(keyword)
    : await axios.users.getAllUsers(page, size);

    if (error) {
      if (error.message?.includes('Unauthorised')) {
        throw new Error('UNAUTHORIZED', { cause: error.message });
      }
      else{
        throw new Error(error.message)
      }
    }
  return (
    <>
      <section className="py-2">
        <div className="container">
          <Table
            data={keyword ? [data] : data.content}
            columns={USER_COLUMNS}
            headerContent={
              <>
                <Link href={ADD_USER_PAGE_ROUTE}>
                  <Button
                    endContent={
                      <span className="material-symbols-rounded">add</span>
                    }
                  >
                    Add User
                  </Button>
                </Link>
              </>
            }
            itemsKey="email"
            type="users"
            searchPlaceholder="Search user by email"
            totalPages={data.totalPages}
            currentPage={page}
            size={size}
            searchkey={keyword}
            renderCell={renderUserTableCell}
          />
        </div>
      </section>
    </>
  );

};

export default UsersPage;