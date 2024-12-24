"use client";

import { Card, Input, Spacer } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { updateUserDetailsAction } from "@/app/(protected)/account/action";
import FormMessage from "@/components/molecules/FormMessage";
import { UserDetailsResponse } from "@/utils/types";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";

const UserDetails = ({ user }: { user: UserDetailsResponse }) => {
  const [state, formAction] = useFormState(updateUserDetailsAction, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Account Details</h2>
        <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Input
            label="Name"
            name="name"
            type="text"
            value={user.name}
            readOnly
            fullWidth
          />

          <Input
            label="Email"
            name="email"
            type="text"
            value={user.email}
            readOnly
            fullWidth
          />

          <Input
            label="Role"
            name="role"
            type="text"
            defaultValue={user.role}
            readOnly
            fullWidth
          />

          <Input
            label="Phone *"
            name="phone"
            type="text"
            defaultValue={user.phone}
            fullWidth
          />

          <Input
            label="Current Password *"
            name="currentPassword"
            type="password"
            placeholder="********"
            fullWidth
          />

          <Input
            label="New Password *"
            name="newPassword"
            type="password"
            placeholder="********"
            fullWidth
          />

          <Input
            label="Confirm New Password *"
            name="confirmNewPassword"
            type="password"
            placeholder="********"
            fullWidth
          />

          <div className="col-span-full">
            {state && <FormMessage message={state} />}
          </div>
          
          <div className="col-span-full">
            <FormSubmitButton 
              className="w-full md:w-auto text-black" 
              pendingText="Updating..." 
              type="submit" 
              disabled={pending} 
              color="primary" 
              size="lg"
            >
              Update Details
            </FormSubmitButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserDetails;
