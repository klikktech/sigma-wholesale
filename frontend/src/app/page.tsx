import Navbar from "@/components/organisms/Navbar";
import HomePage from "./(public)/home/page";
import Footer from "@/components/organisms/Footer";
import { getUser } from "@/lib/axios/session";

const App = async () => {
  return (
    <>
      <Navbar user={getUser()} />
      <div className="px-4 md:px-16 lg:px-32 min-h-[57vh] w-screen">
        <HomePage />
      </div>
      <Footer />
    </>
  );
};

export default App;
