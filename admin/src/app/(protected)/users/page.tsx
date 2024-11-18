import Breadcrumb from "@/components/molecules/BreadCrumb";
import Table from "@/components/organisms/Table";
import { axios } from "@/lib/axios";
import { renderUserTableCell, USER_COLUMNS } from "./columns";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import { ADD_USER_PAGE_ROUTE } from "@/utils/routes";

const UsersPage = async () => {
  const { data, error } = await axios.users.getAllUsers();
  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <Breadcrumb />
      <section className="py-2">
        <div className="container">
          <Table
            searchable
            data={data || []}
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
            renderCell={renderUserTableCell}
          />
        </div>
      </section>
    </>
  );
};

export default UsersPage;
