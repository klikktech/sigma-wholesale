import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { getUser } from "@/lib/axios/session";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = getUser()
    return (
        <main>
            <Navbar user={user}/>
            <div className="px-4 md:px-8 lg:px-32 min-h-[calc(100vh-20rem)]">
                {children}
            </div>
            <Footer/>
        </main>

    );
};

export default PublicLayout;