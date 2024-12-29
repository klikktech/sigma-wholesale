import Navbar from "@/components/organisms/Navbar";
import HomePage from "./(public)/home/page";
import Footer from "@/components/organisms/Footer";
import { getUser } from "@/lib/axios/session";
import { getCartCount } from "@/components/organisms/CartList/action";

const App = async () => {
  const user = await getUser()
  let newCartCount = 0
  let newCartPrice = 0
  if(user?.email){
      const {cartCount,cartPrice} = await getCartCount()
      newCartCount = cartCount
      newCartPrice = cartPrice
  }
  return (
    <section>
      <Navbar user={user} cartTotalCount={newCartCount} cartTotalPrice={newCartPrice} />
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 min-h-[calc(100vh-20rem)]">
        <HomePage />
      </div>
      <Footer />
    </section>
  );
};

export default App;
