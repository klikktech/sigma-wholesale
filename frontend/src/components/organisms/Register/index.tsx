"use client";

import { FC } from "react";
import { useFormState } from "react-dom";
import { Button, Input, Spacer, Textarea } from "@nextui-org/react";
import { createNewUser } from "@/app/(auth)/register/action";

interface FormErrorProps {
    errors?: string[];
}

const FormError: FC<FormErrorProps> = ({ errors }) => {
    if (!errors?.length) return null;

    return (
        <div className="p-2">
            {errors.map((err) => {
                return (
                    <p className="text-tiny text-red-400 list-item" key={err}>
                        {err}
                    </p>
                );
            })}
        </div>
    );
};

const SignUp = () => {
    const [state, formAction] = useFormState(createNewUser, {
        success: false,
    });

    return (
        <div className="flex justify-center p-5">
            <form action={formAction} className="flex flex-col w-full" style={{ maxWidth: '600px' }}>
                <div className="flex gap-3">
                    <div className="w-full">
                        <Input
                            label="First Name *"
                            name="firstName"
                            placeholder="John"
                            labelPlacement='outside'
                        />
                        <FormError errors={state.errors?.firstName} />
                    </div>
                    <div className="w-full">
                        <Input
                            label="Last Name *"
                            name="lastName"
                            placeholder="Doe"
                            labelPlacement='outside'
                        />
                        <FormError errors={state.errors?.lastName} />
                    </div>
                </div>

                <Spacer y={3} />
                <Input
                    label="Email *"
                    name="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    labelPlacement='outside'
                    fullWidth
                />
                <FormError errors={state.errors?.email} />

                <Spacer y={3} />
                <Input
                    label="Company Name"
                    name="companyName"
                    placeholder="Company LLC"
                    labelPlacement='outside'
                    fullWidth
                />
                <FormError errors={state.errors?.companyName} />

                <Spacer y={3} />
                <div className="flex gap-3">
                    <div className="w-full">
                        <Input
                            label="Phone Number *"
                            name="phoneNumber"
                            type="tel"
                            placeholder="123-456-7890"
                            labelPlacement='outside'
                            fullWidth
                        />
                        <FormError errors={state.errors?.phoneNumber} />
                    </div>
                    <div className="w-full">
                        <Input
                            label="Alternative Phone Number"
                            name="altPhoneNumber"
                            type="tel"
                            placeholder="Optional"
                            labelPlacement='outside'
                            fullWidth
                        />
                        <FormError errors={state.errors?.altPhoneNumber} />
                    </div>
                </div>

                <Spacer y={3} />
                <Input
                    label="Sales Tax Number"
                    name="taxNumber"
                    placeholder="123456789"
                    labelPlacement='outside'
                    fullWidth
                />
                <FormError errors={state.errors?.taxNumber} />

                <Spacer y={3} />
                <Input
                    label="Website"
                    name="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    labelPlacement='outside'
                    fullWidth
                />
                <FormError errors={state.errors?.website} />

                <Spacer y={3} />
                <div className="flex gap-3">
                    <div className="w-full">
                        <Input
                            label="Password *"
                            name="password"
                            type="password"
                            placeholder="********"
                            labelPlacement='outside'
                            // required
                            fullWidth
                        />
                        <FormError errors={state.errors?.password} />
                    </div>
                    <div className="w-full">
                        <Input
                            label="Confirm Password *"
                            name="confirmPassword"
                            type="password"
                            placeholder="********"
                            labelPlacement='outside'
                            // required
                            fullWidth
                        />
                        <FormError errors={state.errors?.confirmPassword} />
                    </div>
                </div>

                <Spacer y={3} />
                <Textarea
                    label="Tell us a little about yourself"
                    name="bio"
                    placeholder="This will help us verify your business identity"
                    labelPlacement='outside'
                    fullWidth
                />
                <FormError errors={state.errors?.bio} />

                <Spacer y={3} />
                <Input
                    label="Address 1 *"
                    name="address1"
                    placeholder="123 Main St"
                    labelPlacement='outside'
                    // required
                    fullWidth
                />
                <FormError errors={state.errors?.address1} />

                <Spacer y={3} />
                <Input
                    label="Address 2"
                    name="address2"
                    placeholder="Apartment, suite, etc."
                    labelPlacement='outside'
                    fullWidth
                />
                <FormError errors={state.errors?.address2} />

                <Spacer y={3} />
                <div className="flex gap-3">
                    <div className="w-full">
                        <Input
                            label="City *"
                            name="city"
                            placeholder="City"
                            labelPlacement='outside'
                            // required
                            fullWidth
                        />
                        <FormError errors={state.errors?.city} />
                    </div>
                    <div className="w-full">
                        <Input
                            label="Country *"
                            name="country"
                            placeholder="Country"
                            labelPlacement='outside'
                            // required
                            fullWidth
                        />
                        <FormError errors={state.errors?.country} />
                    </div>

                    <div className="w-full">
                        <Input
                            label="Zip Code *"
                            name="zipCode"
                            placeholder="ZIP"
                            labelPlacement='outside'
                            // required
                            fullWidth
                        />
                        <FormError errors={state.errors?.zipCode} />
                    </div>
                </div>

                <Spacer y={3} />
                {/* {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>} */}
                <Button type="submit" color="primary" size="lg">
                    Register
                </Button>
            </form>
        </div>
    );
};

export default SignUp;