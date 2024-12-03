import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { DESCRIPTION, SIGMA_WHOLESALE } from "@/utils/constants";
import { Providers } from "./providers";
import { ToastContainer } from 'react-toastify';
import AgeVerification from "@/components/organisms/AgeVerificationPopup";
import { getAgeVerification } from "@/lib/axios/session";

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
  const isVerified = getAgeVerification();

  return (
    <html lang="en" className="SigmaLTheme">
      <body className={manrope.variable}>
      {isVerified !== "true" && <AgeVerification />}
        <Providers>
          <div className="">
            {children}
          </div>
        </Providers>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
