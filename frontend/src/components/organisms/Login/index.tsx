"use client";

import { Input, Link, Spacer } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/atoms/Button";
import { authenticate } from "@/app/(auth)/login/action";
import Image from "next/image";
import logo from "../../../assets/sigma-logo.webp"
import { SIGNUP_PAGE_ROUTE } from "@/utils/urls";

const Login = () => {
  const [state, formAction] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center items-center">
        <form action={formAction} className="flex flex-col w-full" style={{ maxWidth: '500rem' }}>

        <div className="mb-16 mt-0 mx-10">
          <Image src={logo} alt={"logo"} />
        </div>
        
        <Input
          label="Email *"
          name="email"
          type="text"
          placeholder="johndoe@example.com"
          labelPlacement="outside"
          required
          fullWidth
        />
        {state?.errors?.email && (
          <p className="text-danger">{state.errors.email}</p>
        )}

        <Spacer y={5} />

        <Input
          label="Password *"
          name="password"
          type="password"
          placeholder="********"
          labelPlacement="outside"
          required
          fullWidth
        />
        {state?.errors?.password && (
          <div className="text-danger">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}

        <Spacer y={5} />

        <div className="text-left">
            <p className="text-sm">
              Don&apos;t have an account?&nbsp;

            <Link
              className="text-primary font-medium underline"
              href={SIGNUP_PAGE_ROUTE}
            >
              Sign up
            </Link>
            </p>
        </div>

        <Spacer y={5} />

        <Button className="mb-10" disabled={pending} type="submit" color="primary" size="lg">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

// import { authenticate } from "@/app/(auth)/login/action";
// import FormMessage from "@/components/molecules/FormMessage";
// import FormSubmitButton from "@/components/molecules/FormSubmitButton";
// import { SIGNUP_PAGE_ROUTE } from "@/utils/urls";
// import { Input } from "@nextui-org/react";
// import Link from "next/link";

// const SignIn = ({ searchParams }: { searchParams: Message }) => {
//   return (
//     <form className="flex-1 flex flex-col min-w-64 w-full">
//       <h1 className="text-2xl font-medium">Sign in</h1>
//       <p className="text-sm text-foreground">
//         Don&apos;t have an account?
//         <Link
//           className="text-foreground font-medium underline"
//           href={SIGNUP_PAGE_ROUTE}
//         >
//           Sign up
//         </Link>
//       </p>
//       <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
//         <label htmlFor="email">Email</label>
//         <Input
//           size="lg"
//           type="email"
//           name="email"
//           placeholder="Email"
//           required
//         />
//         <div className="flex justify-between items-center">
//           <label htmlFor="password">Password</label>
//           <Link
//             className="text-xs text-foreground underline"
//             href="/forgot-password"
//           >
//             Forgot Password?
//           </Link>
//         </div>
//         <Input
//           size="lg"
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//         />
//         <FormSubmitButton pendingText="Signing In..." formAction={authenticate}>
//           Sign in
//         </FormSubmitButton>
//         <FormMessage message={searchParams} />
//       </div>
//     </form>
//   );
// }

// export default SignIn