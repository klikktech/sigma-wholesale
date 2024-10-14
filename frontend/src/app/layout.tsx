import type { Metadata } from "next";
import { Inter, Manrope, Poppins } from "next/font/google";
import "./globals.css";
import { DESCRIPTION, SIGMA_WHOLESALE } from "@/utils/constants";
import { Providers } from "./providers";

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
  return (
    <html lang="en" className="SigmaLTheme">
      <body className={manrope.variable}>
        <Providers>
          <div className="">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
