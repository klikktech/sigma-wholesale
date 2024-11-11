"use client";
import { NAV_MENU_ITEMS } from "@/utils/constants";
import { Input } from "@nextui-org/input";
import {
  Link,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Badge,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../assets/sigma-logo.png"
import AvatarMenu from "../AvatarMenu";
import { CART_LIST_PAGE_ROUTE, HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from "@/utils/urls";
import { useCartStore } from '@/store/cartStore';
import { useFormState } from "react-dom";
import { searchAction } from "./action";

type Props = {
  user: any
};

const Navbar = ({ user }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.cartCount);
  const [state, formAction] = useFormState(searchAction, undefined);


  return (
    <>
      <NextUINavbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href={HOME_PAGE_ROUTE}>
              <Image width={250} src={logo} alt={"logo"} />
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {NAV_MENU_ITEMS.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                className="w-full text-sm"
                href={item.path}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {/* <form action={formAction}>
            <Input
              className="w-48 text-sm"
              name="keyword"
              type="text"
              placeholder="Search"
            />
            <Button className="w-full mt-3 px-3" color="primary" type='submit'>
              <span className="material-symbols-rounded text-3xl">search</span>
            </Button>
            </form> */}
            <form action={formAction} className="flex items-center">
              <div className="relative w-48">
                <input
                  className="w-full text-sm px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  name="keyword"
                  type="text"
                  placeholder="Search"
                />
                <span className="absolute mt-1 right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <span className="material-symbols-rounded">search</span>
                </span>
              </div>
              <Button
                className="ml-3 px-3 py-2 bg-primary text-black rounded-lg hover:bg-primary-dark"
                color="primary"
                type="submit"
              >
                Search
              </Button>
            </form>
          </NavbarItem>
          {user ? <>
            <NavbarItem className="hidden lg:flex">
              <Badge color="danger" size="sm" content={cartCount} shape="circle">
                <Link href={CART_LIST_PAGE_ROUTE} isDisabled={cartCount<1}>
                  <span
                    className="material-symbols-rounded text-3xl"
                  >
                    shopping_cart
                  </span>
                </Link>
              </Badge>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <AvatarMenu user={user} />
            </NavbarItem>
          </>
            : <NavbarItem className="hidden lg:flex">
              <Link href={LOGIN_PAGE_ROUTE}>Sign In</Link>
            </NavbarItem>
          }


        </NavbarContent>
        <NavbarMenu>
          {NAV_MENU_ITEMS.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                className="w-full"
                href={item.path}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};

export default Navbar;
