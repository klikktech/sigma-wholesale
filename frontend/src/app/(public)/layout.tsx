import Navbar from "@/components/organisms/Navbar";
import { cookies } from "next/headers";
import { decrypt } from "@/api/session";

const cookie = cookies().get("session")?.value;
const session = decrypt(cookie);
const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar user={session?.sub} />
            <div className="">
                {children}
            </div>
        </>

    );
};

export default PublicLayout;