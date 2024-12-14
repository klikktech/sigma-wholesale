"use client";

import { Card, Input, Spacer } from "@nextui-org/react";
import Button from "@/components/atoms/ScrollButton";
import { useFormState, useFormStatus } from "react-dom";
import { updateUserDetailsAction } from "@/app/(protected)/account/action";
import FormMessage from "@/components/molecules/FormMessage";
import { UserDetailsResponse } from "@/utils/types";

const UserDetails = ({ user }: { user: UserDetailsResponse }) => {
  const [state, formAction] = useFormState(updateUserDetailsAction, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center items-center my-4">
      <Card className="max-w-5xl w-full rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Account Details</h2>
      <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

        <Spacer y={3} />
        <p className="text-red-500 text-left">{state && <FormMessage message={state} />}</p>
        <Spacer y={3} />
        <Button className="mb-10" disabled={pending} type="submit" color="primary" size="lg">
          Update Details
        </Button>
        </form>
      </Card>
    </div>
  );
};

export default UserDetails;
