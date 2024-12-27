import { axios } from "@/lib/axios";
import UserDetails from "@/components/organisms/UserDetails";
import UnauthorizedError from "@/components/molecules/Error";
const fetchUserDetails = async () => {
  const { data, error } = await axios.users.getUserDetails();
  console.log("data", data)
  if (error) {
    if (error.message?.includes('Unauthorised')) {
      return <UnauthorizedError />
    } else {
      throw new Error(error.message)
    }
  } 
  return data;
};

const MyAccountPage = async () => {
  const userDetails = await fetchUserDetails();

  return (
    <div>
      <UserDetails user={userDetails} />
    </div>
  );
};

export default MyAccountPage;
