"use client";

import { FC } from "react";
import { useFormState } from "react-dom";
import { Input, Spacer } from "@nextui-org/react";
import { createNewUser } from "@/app/(auth)/register/action";
import Image from "next/image";
import logo from "../../../assets/sigma-logo.png"
import Button from "@/components/atoms/Button";


interface FormErrorProps {
    errors?: string[];
}

// const FormError: FC<FormErrorProps> = ({ errors }) => {
//     if (!errors?.length) return null;

//     return (
//         <div className="p-2">
//             {errors.map((err) => {
//                 return (
//                     <p className="text-tiny text-red-400 list-item" key={err}>
//                         {err}
//                     </p>
//                 );
//             })}
//         </div>
//     );
// };

const SignUp = () => {
    const [state, formAction] = useFormState(createNewUser, undefined);

    return (
        <div className="flex justify-center items-center p-2">
            <form action={formAction} className="flex flex-col w-full" style={{ maxWidth: '500rem' }}>
                <div className="mb-3 mx-10">
                    <Image src={logo} alt={"logo"} />
                </div>

                <Input
                    label="First Name *"
                    name="firstName"
                    placeholder="John"
                    labelPlacement='outside'
                />

                <Spacer y={3} />

                <Input
                    label="Last Name *"
                    name="lastName"
                    placeholder="Doe"
                    labelPlacement='outside'
                />

                <Spacer y={3} />
                <Input
                    label="Nick Name"
                    name="nickName"
                    placeholder="Howdy"
                    labelPlacement='outside'
                    fullWidth
                />

                <Spacer y={3} />
                <Input
                    label="Email *"
                    name="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    labelPlacement='outside'
                    fullWidth
                />

                <Spacer y={3} />
                <Input
                    label="Phone Number *"
                    name="phoneNumber"
                    type="tel"
                    placeholder="123-456-7890"
                    labelPlacement='outside'
                    fullWidth
                />
                <Spacer y={3} />

                <Input
                    label="Password *"
                    name="password"
                    type="password"
                    placeholder="********"
                    labelPlacement='outside'
                    // required
                    fullWidth
                />
                <Spacer y={3} />

                <Input
                    label="Confirm Password *"
                    name="confirmPassword"
                    type="password"
                    placeholder="********"
                    labelPlacement='outside'
                    // required
                    fullWidth
                />

                <Spacer y={3} />
                <Input
                    label="Shipping Address *"
                    name="shippingAddress"
                    placeholder="123 Main St"
                    labelPlacement='outside'
                    // required
                    fullWidth
                />
                <Spacer y={3} />

                <Input
                    label="Shipping City *"
                    name="shippingCity"
                    placeholder="City"
                    labelPlacement='outside'
                    // required
                    fullWidth
                />
                <Spacer y={3} />

                <Input
                    label="Shipping State *"
                    name="shippingState"
                    placeholder="State"
                    labelPlacement='outside'
                    // required
                    fullWidth
                />
                <Spacer y={3} />

                <Input
                    label="Shipping Zip Code *"
                    name="shippingZip"
                    placeholder="ZIP"
                    labelPlacement='outside'
                    // required
                    fullWidth
                />
                <Spacer y={3} />

                <Input
                    label="Store Address *"
                    name="storeAddress"
                    placeholder="123 Main St"
                    labelPlacement='outside'
                    // required
                    fullWidth
                />
                <Spacer y={3} />

                <Input
                    label="Store City *"
                    name="storeCity"
                    placeholder="City"
                    labelPlacement='outside'
                    // required
                    fullWidth
                />
                <Spacer y={3} />

                <Input
                    label="Store State *"
                    name="storeState"
                    placeholder="State"
                    labelPlacement='outside'
                    // required
                    fullWidth
                />
                <Spacer y={3} />

                <Input
                    label="Store Zip Code *"
                    name="storeZip"
                    placeholder="ZIP"
                    labelPlacement='outside'
                    // required
                    fullWidth
                />

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