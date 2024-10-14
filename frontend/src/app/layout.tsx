import type { Metadata } from "next";
import { Inter, Manrope, Poppins } from "next/font/google";
import "./globals.css";
import { DESCRIPTION, SIGMA_WHOLESALE } from "@/utils/constants";
import { Providers } from "./providers";
import Navbar from "@/components/organisms/Navbar";
import { cookies } from "next/headers";
import { decrypt } from "@/api/session";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
export const metadata: Metadata = {
  title: SIGMA_WHOLESALE,
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().get("session")?.value;
  const session = decrypt(cookie);
  console.log(session,"session in layout")
  return (
    <html lang="en" className="SigmaLTheme">
      <body className={manrope.variable}>
        <Providers>
          <div className="">
            <Navbar user={session?.sub}/>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
