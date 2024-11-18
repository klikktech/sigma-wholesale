import { axios } from "@/lib/axios";
import UserDetails from "@/components/organisms/UserDetails";
const fetchUserDetails = async () => {
  const { data, error } = await axios.users.getUserDetails();
  console.log("data", data)
  if (error) {
    throw new Error(error.message);
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
