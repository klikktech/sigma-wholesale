import { redirect } from "next/navigation";
import { LANDING_PAGE_ROUTE } from "@/utils/routes";

const Home = () => {
  redirect(LANDING_PAGE_ROUTE);
};

export default Home;
