import SideNav from "@/components/organisms/SideNav";
import { getUser } from "@/lib/axios/session";
import { SIDENAV_ITEMS } from "@/utils/constants";
import { SIGNIN_PAGE_ROUTE } from "@/utils/routes";
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
    <div className="flex w-full">
      <div className="w-1/6">
        <SideNav items={SIDENAV_ITEMS} user={user} />
      </div>
      <div className="w-5/6 p-3">{children}</div>
    </div>
  );
}
