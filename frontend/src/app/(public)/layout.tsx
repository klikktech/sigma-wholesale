import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { getUser } from "@/lib/axios/session";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = getUser()
    return (
        <main>
            <Navbar user={user}/>
            <div className="px-32 min-h-[57vh]">
                {children}
            </div>
            <Footer/>
        </main>

    );
};

export default PublicLayout;