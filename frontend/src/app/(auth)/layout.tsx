import Image from "next/image";
import authBanner from "@/assets/auth-logo.webp";
import logo from "../../assets/sigma-logo.png"

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex items-center justify-center mx-auto mt-5">
      <div className="min-w-70 max-w-[75vw] mt-10 flex items-center rounded-2xl overflow-hidden shadow-2xl shadow-shadow">
        <div className="w-1/2">
          <Image
            src={authBanner}
            alt="auth-banner"
            className="object-cover h-[85vh] w-full"
          />
        </div>
        <div className="w-1/2 px-14">
          <div className="flex justify-around">
            <Image className="py-5" width={300} src={logo} alt={"logo"} />
          </div>
          <div className="max-h-[70vh] max-w-70 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;