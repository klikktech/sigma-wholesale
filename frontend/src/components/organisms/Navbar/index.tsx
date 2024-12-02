// "use client";
// import {
//   Link,
//   Navbar as NextUINavbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   NavbarMenuToggle,
//   Badge,
//   Button,
// } from "@nextui-org/react";
// import Image from "next/image";
// import React, { useState } from "react";
// import logo from "../../../assets/sigma-logo.png"
// import AvatarMenu from "../AvatarMenu";
// import { CART_LIST_PAGE_ROUTE, HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from "@/utils/urls";
// import { useCartStore } from '@/store/cartStore';
// import { useFormState } from "react-dom";
// import { searchAction } from "./action";

// type Props = {
//   user: any
// };

// const Navbar = ({ user }: Props) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const cartCount = useCartStore((state) => state.cartCount);
//   const [state, formAction] = useFormState(searchAction, undefined);


//   return (
//     <>
//       <NextUINavbar onMenuOpenChange={setIsMenuOpen}>
//         <NavbarContent>
//           <NavbarMenuToggle
//             aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//             className="sm:hidden"
//           />
//           <NavbarBrand>
//             <Link href={HOME_PAGE_ROUTE}>
//               <Image width={250} src={logo} alt={"logo"} />
//             </Link>
//           </NavbarBrand>
//         </NavbarContent>

//         <NavbarContent justify="end">
//           <NavbarItem className="hidden lg:flex">
//             <form action={formAction} className="flex items-center">
//               <div className="relative w-48">
//                 <input
//                   className="w-full text-sm px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                   name="keyword"
//                   type="text"
//                   placeholder="Search"
//                 />
//                 <span className="absolute mt-1 right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                   <span className="material-symbols-rounded">search</span>
//                 </span>
//               </div>
//               <Button
//                 className="ml-3 px-3 py-2 bg-primary text-black rounded-lg hover:bg-primary-dark"
//                 color="primary"
//                 type="submit"
//               >
//                 Search
//               </Button>
//             </form>
//           </NavbarItem>
//           {user ? <>
//             <NavbarItem className="hidden lg:flex">
//               <Badge color="danger" size="sm" content={cartCount} shape="circle">
//                 <Link href={CART_LIST_PAGE_ROUTE} isDisabled={cartCount<1}>
//                   <span
//                     className="material-symbols-rounded text-3xl"
//                   >
//                     shopping_cart
//                   </span>
//                 </Link>
//               </Badge>
//             </NavbarItem>
//             <NavbarItem className="hidden lg:flex">
//               <AvatarMenu user={user} />
//             </NavbarItem>
//           </>
//             : <NavbarItem className="hidden lg:flex">
//               <Link href={LOGIN_PAGE_ROUTE}>Sign In</Link>
//             </NavbarItem>
//           }


//         </NavbarContent>
//       </NextUINavbar>
//     </>
//   );
// };

// export default Navbar;


"use client";
import {
  Link,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Badge,
  Button,
  Input,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import logo from "../../../assets/sigma-logo.png";
import AvatarMenu from "../AvatarMenu";
import { 
  ACCOUNT_PAGE_ROUTE,
  CART_LIST_PAGE_ROUTE, 
  HOME_PAGE_ROUTE, 
  LOGIN_PAGE_ROUTE,
  ORDERS_PAGE_ROUTE
} from "@/utils/urls";
import { useCartStore } from '@/store/cartStore';
import { useFormState, useFormStatus } from "react-dom";
import { searchAction } from "./action";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";

type Props = {
  user: any
};

const Navbar = ({ user }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.cartCount);
  const [state, formAction] = useFormState(searchAction, undefined);
  const pathname = usePathname();
  const { pending } = useFormStatus();


  // Navigation menu items
  const menuItems = [
    { label: "Home", href: HOME_PAGE_ROUTE },
    ...(user ? [
      { label: "My Account", href: ACCOUNT_PAGE_ROUTE },
      { label: "My Orders", href: ORDERS_PAGE_ROUTE },
      { label: "Cart", href: CART_LIST_PAGE_ROUTE }
    ] : [
      { label: "Sign In", href: LOGIN_PAGE_ROUTE }
    ])
  ];

  return (
    <NextUINavbar 
      isMenuOpen={isMenuOpen} 
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden" 
        />
        <NavbarBrand>
          <Link href={HOME_PAGE_ROUTE}>
            <Image 
              width={200} 
              height={50} 
              src={logo} 
              alt="Company Logo" 
              priority 
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden sm:flex">
        <NavbarItem>
          <form action={formAction} className="flex items-center">
            <Input
              name="keyword"
              type="text"
              placeholder="Search products..."
              className="w-[300px]"
            />
            <FormSubmitButton 
              type="submit" 
              color="primary" 
              className="ml-2 text-black"
              pendingText="Searching..."
              disabled={pending}
            >
              Search
            </FormSubmitButton>
          </form>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden sm:flex">
        {user ? (
          <>
            <NavbarItem>
              <Badge 
                color="danger" 
                content={cartCount} 
                isInvisible={cartCount < 1}
                shape="circle"
              >
                <Link 
                  href={CART_LIST_PAGE_ROUTE} 
                  isDisabled={cartCount < 1}
                  color={pathname === CART_LIST_PAGE_ROUTE ? "primary" : "foreground"}
                >
                  <span className="material-symbols-rounded text-2xl">
                    shopping_cart
                  </span>
                </Link>
              </Badge>
            </NavbarItem>
            <NavbarItem>
              <AvatarMenu user={user} />
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button 
              as={Link} 
              href={LOGIN_PAGE_ROUTE} 
              color="primary" 
              className="text-black"
            >
              Sign In
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu className="pt-16">
        <NavbarMenuItem className="mb-4 sm:hidden">
          <form action={formAction} className="flex items-center">
            <Input
              name="keyword"
              type="text"
              placeholder="Search products..."
              fullWidth
            />
            <Button 
              type="submit" 
              color="primary" 
              className="ml-2"
            >
              Search
            </Button>
          </form>
        </NavbarMenuItem>

        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              color={
                pathname === item.href ? "primary" : "foreground"
              }
              href={item.href}
              size="lg"
              className="w-full py-2 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
};

export default Navbar;