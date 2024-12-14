import Image from "next/image";
import authBanner from "@/assets/login.webp";
import logo from "../../assets/sigma-logo.webp"

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex items-center justify-center mx-auto mt-5 p-4">
      <div className="min-w-70 max-w-[90vw] md:max-w-[75vw] mt-10 flex flex-col md:flex-row items-center rounded-2xl overflow-hidden shadow-2xl shadow-shadow">
        <div className="w-full md:w-1/2">
          <Image
            src={authBanner}
            alt="auth-banner"
            className="object-cover h-[40vh] md:h-[85vh] w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-4 md:px-14">
          <div className="flex justify-center md:justify-around">
            <Image className="py-5" width={300} src={logo} alt={"logo"} />
          </div>
          <div className="max-h-[70vh] overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;