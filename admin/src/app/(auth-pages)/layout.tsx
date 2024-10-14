import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import authBanner from "@/assets/auth-banner.webp";
import brandLogo from "@/assets/sigma-logo.webp";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex items-center mx-auto min-h-screen">
      <Card className="w-full">
        <CardBody className="p-0">
          <div className="flex items-center">
            <div className="w-1/2 h-auto">
              <Image
                src={authBanner}
                alt="auth-banner"
                className="object-cover h-[80vh] w-full"
              />
            </div>
            <div className="w-1/2 p-14 flex flex-col items-center gap-12"><Image
                src={brandLogo}
                alt="auth-banner"
                height={70}
              />{children}</div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AuthLayout;
