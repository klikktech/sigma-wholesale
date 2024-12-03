"use client";

import {
  Table as NextUiTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import Input from "@/components/atoms/Input";
import { ITableColumn } from "@/utils/types";
import { useRouter } from "next/navigation";
import FormSubmitButton from "@/components/molecules/FormSubmitButtton";
import { useFormState, useFormStatus } from "react-dom";
import { searchAction } from "./action";
import FormMessage from "@/components/molecules/FormMessage";

interface Props {
  data: Record<string, any>[];
  columns: ITableColumn[];
  totalPages: number;
  currentPage: number;
  size: number;
  searchPlaceholder?: string;
  searchkey?: string;
  type: string;
  headerContent?: JSX.Element;
  itemsKey?: string;
  renderCell?: (
    row: Record<string, any> | any,
    columnKey: React.Key
  ) => JSX.Element;
}

const Table = ({
  searchPlaceholder = "Search by name",
  data,
  columns,
  totalPages,
  currentPage,
  size,
  type,
  searchkey,
  itemsKey = "id",
  ...props
}: Props) => {
  const router = useRouter();
  const handlePageChange = (page: number) => {
    const queryParams = new URLSearchParams();
    queryParams.set('page', page.toString());
    queryParams.set('size', size.toString());
    if (searchkey) queryParams.set('keyword', searchkey);

    const baseUrl = `${type}`

    console.log(baseUrl, "baseUrl");

    const url = `${baseUrl}?${queryParams.toString()}`;
    router.push(url);
  };
  const formAction = async (prevState: any, formData: FormData) => {
    return searchAction(type, undefined, formData);
  };

  const [state, dispatch] = useFormState(formAction, undefined);
  const { pending } = useFormStatus();

  return (
    <NextUiTable
      aria-label="Users table"
      topContent={
        <>
          <div className="flex items-center justify-between">
            <form action={dispatch} className="flex items-center">
              <Input
                name="keyword"
                type="text"
                placeholder={searchPlaceholder}
                className="w-[300px]"
              />
              <FormSubmitButton
                type="submit"
                color="primary"
                className="ml-2"
                pendingText="Searching..."
                buttonText='Search'
                disabled={pending}
              >
                Search
              </FormSubmitButton>
            </form>
            {props.headerContent}
          </div>
          {state && <FormMessage message={state} />}
        </>
      }
      topContentPlacement="outside"
      bottomContent={
        totalPages > 0 ? (
          <div className="flex w-full justify-center items-center">
            <Pagination
              showControls
              total={totalPages}
              initialPage={currentPage}
              page={currentPage}
              onChange={handlePageChange}
              className="my-8"
            />
          </div>
        ) : null
      }
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data} emptyContent={"No items to display."}>
        {(item) => (
          <TableRow key={item[itemsKey]}>
            {(columnKey) => (
              <TableCell>
                {props.renderCell
                  ? props.renderCell(item, columnKey)
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </NextUiTable>
  );
};

export default Table;
