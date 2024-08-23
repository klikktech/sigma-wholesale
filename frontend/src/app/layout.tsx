import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DESCRIPTION, SIGMA_WHOLESALE } from "@/utils/constants";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
