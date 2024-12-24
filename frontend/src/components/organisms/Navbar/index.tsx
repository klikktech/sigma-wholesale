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
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import logo from "../../../assets/sigma-logo.webp";
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
import ScrollButton from "@/components/atoms/ScrollButton";

type Props = {
  user: any
  cartTotalCount: number
  cartTotalPrice: number
};

const Navbar = ({ user, cartTotalCount, cartTotalPrice }: Props) => {
  console.log(user, cartTotalCount, cartTotalPrice, "user cartTotalCount cartTotalPrice")
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setCartCount = useCartStore((state) => state.setCartCount);
  const [state, formAction] = useFormState(searchAction, undefined);
  const pathname = usePathname();
  const { pending } = useFormStatus();

  useEffect(() => {
    setCartCount(cartTotalCount, cartTotalPrice);
  }, [cartTotalCount, cartTotalPrice, setCartCount]);

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
      <NavbarContent className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
        <ScrollButton scrollTargetId="new-arrivals-section" className="font-semibold text-medium">New Arrivals</ScrollButton>
        <ScrollButton scrollTargetId="tabs-section" className="font-semibold text-medium">Categories</ScrollButton>
        <ScrollButton scrollTargetId="brands-section" className="font-semibold text-medium">Brands</ScrollButton>
        <NavbarItem>
          <form action={formAction} className="w-full flex items-center max-w-md">
            <Input
              name="keyword"
              type="text"
              placeholder="Search products..."
              className="w-full"
            />
            <FormSubmitButton 
              type="submit" 
              color="primary" 
              className="ml-2 px-4 py-2 text-black"
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
                content={cartTotalCount} 
                isInvisible={cartTotalCount < 1}
                shape="circle"
              >
                <Link 
                  href={CART_LIST_PAGE_ROUTE} 
                  isDisabled={cartTotalCount < 1}
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
              className="text-black hover:bg-primary-600"
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