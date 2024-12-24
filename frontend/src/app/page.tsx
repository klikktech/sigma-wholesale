import Navbar from "@/components/organisms/Navbar";
import HomePage from "./(public)/home/page";
import Footer from "@/components/organisms/Footer";
import { getCartCount, getUser } from "@/lib/axios/session";

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
    <>
      <Navbar user={user} cartTotalCount={newCartCount} cartTotalPrice={newCartPrice} />
      <div className="px-4 md:px-16 lg:px-32 min-h-[57vh] w-screen">
        <HomePage />
      </div>
      <Footer />
    </>
  );
};

export default App;
