import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import { getCartCount, getUser } from "@/lib/axios/session";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getUser()
    const {cartCount,cartPrice} = await getCartCount()
    
    return (
        <main>
            <Navbar user={user} cartTotalCount={cartCount} cartTotalPrice={cartPrice}/>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-20rem)]">
                {children}
            </div>
            <Footer/>
        </main>
    );
};

export default ProtectedLayout;