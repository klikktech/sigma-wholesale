import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { getUser } from "@/lib/axios/session";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = getUser()
    console.log(user,"user")
    return (
        <>
            <Navbar user={user}/>
            <div className="px-32">
                {children}
            </div>
            <Footer/>
        </>

    );
};

export default PublicLayout;