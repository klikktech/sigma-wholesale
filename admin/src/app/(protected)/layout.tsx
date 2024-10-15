import Breadcrumb from "@/components/molecules/BreadCrumb";
import SideNav from "@/components/organisms/SideNav";
import { getUser } from "@/lib/axios/session";
import { SIDENAV_ITEMS } from "@/utils/constants";
import { SIGNIN_PAGE_ROUTE } from "@/utils/routes";
import { Navbar } from "@nextui-org/react";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getUser();
  if (!user) {
    redirect(SIGNIN_PAGE_ROUTE);
  }
  return (
    <main className="h-svh overflow-hidden flex">
      <div>
        <SideNav items={SIDENAV_ITEMS} user={user} />
      </div>
      <div className="overflow-auto w-full">
        <Navbar maxWidth="full" className="items-center">
          <Breadcrumb />
        </Navbar>
        <div className="px-6 pb-6">{children}</div>
      </div>
    </main>
  );
}
