import EditUserForm from "@/components/organisms/forms/users/EditUserForm";
import { axios } from "@/lib/axios";
import React from "react";

const EditUserPage = async ({ params }: { params: { email: string } }) => {
  const { data, error } = await axios.users.getUserDetails(params.email);
  console.log(data,"edit user")
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
  
  return (
    <div>
      <EditUserForm user={data} />
    </div>
  );
};

export default EditUserPage;
