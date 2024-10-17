"use client";
import { NAV_MENU_ITEMS, SIGMA_WHOLESALE } from "@/utils/constants";
import { Input } from "@nextui-org/input";
import {
  Button,
  Link,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  user,
  Avatar,
  Badge,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../assets/sigma-logo.png"
import { cookies } from "next/headers";
import { decrypt } from "@/api/session";
import AvatarMenu from "../AvatarMenu";

type Props = {
  user: any
};

const Navbar = ({ user }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <NextUINavbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Image src={logo} alt={"logo"} />
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
            <Input
              className="w-48 text-sm"
              type="text"
              placeholder="Search"
            />
          </NavbarItem>
          {/* {user ? <> */}
                    <NavbarItem className="hidden lg:flex">
                      <Badge color="danger" size="sm" content={50} shape="circle">
                        <span
                          className="material-symbols-rounded text-3xl"
                        >
                          shopping_cart
                        </span>
                      </Badge>
                    </NavbarItem>
                    <NavbarItem className="hidden lg:flex">
                      <AvatarMenu />
                    </NavbarItem>
                  {/* </>
          //       : <NavbarItem className="hidden lg:flex">
          //           <Link href="#">Sign In</Link>
          //         </NavbarItem>
          // } */}


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
