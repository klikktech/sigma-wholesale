import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import SideNav from "@/components/organisms/SideNav";
import BreadcrumbSkeleton from "@/components/molecules/BreadCrumbSkeleton";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex w-full">
            <div className="w-1/6">
              <SideNav />
            </div>
            <div className="w-5/6 p-3">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
