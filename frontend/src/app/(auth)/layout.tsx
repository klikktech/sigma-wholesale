import Image from "next/image";
import authBanner from "@/assets/auth-logo.webp";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex items-center justify-center mx-auto">
      <div className="min-w-70 max-w-[75vw] mt-10 flex items-center rounded-2xl overflow-hidden shadow-2xl shadow-shadow">
        <div className="w-1/2">
          <Image
            src={authBanner}
            alt="auth-banner"
            className="object-cover h-[75vh] w-full"
          />
        </div>
        <div className="w-1/2 px-14 max-h-[75vh] max-w-70 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;