import Navbar from "@/components/organisms/Navbar";
import { cookies } from "next/headers";
import { decrypt } from "@/api/session";
import Footer from "@/components/organisms/Footer";

// const cookie = cookies().get("session")?.value;
// const session = decrypt(cookie);
const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar user={''}/>
            <div className="px-32">
                {children}
            </div>
            <Footer/>
        </>

    );
};

export default PublicLayout;