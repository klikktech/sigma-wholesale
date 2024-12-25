import { axios } from "@/lib/axios";
import UserDetails from "@/components/organisms/UserDetails";
const fetchUserDetails = async () => {
  const { data, error } = await axios.users.getUserDetails();
  console.log("data", data)
  if (error) {
    if (error.message?.includes('Unauthorised')) {
      throw new Error('UNAUTHORIZED', { 
        cause: {
          code: 'Unauthorised',
          message: 'Your session has expired. Please log in again.'
        }
      });
    } else {
      throw new Error('ERROR', { 
        cause: {
          code: 'UNKNOWN',
          message: error.message
        }
      });
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
