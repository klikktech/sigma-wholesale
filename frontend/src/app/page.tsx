import Navbar from "@/components/organisms/Navbar";
import HomePage from "./(public)/home/page";
import Footer from "@/components/organisms/Footer";
import { cookies } from "next/headers";
import AgeVerification from "@/components/organisms/AgeVerificationPopup";
import { getAgeVerification, getUser } from "@/lib/axios/session";

const App = async () => {
  const isVerified = getAgeVerification();
  return (
    <>
      {isVerified !== "true" && <AgeVerification />}
      <Navbar user={getUser()} />
      <div className="px-4 md:px-16 lg:px-32 min-h-[57vh] w-screen">
        <HomePage />
      </div>
      <Footer />
    </>
  );
};

export default App;
