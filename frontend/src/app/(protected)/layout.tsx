import Navbar from "@/components/organisms/Navbar";
import { getUser } from "@/lib/axios/session";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = getUser()
    return (
        <>
            <Navbar user={user} />
            <div className="">
                {children}
            </div>
        </>

    );
};

export default ProtectedLayout;