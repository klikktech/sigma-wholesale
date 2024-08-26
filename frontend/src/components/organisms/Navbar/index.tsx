"use client";
import { NAV_MENU_ITEMS, SIGMA_WHOLESALE } from "@/utils/constants";
import {Input} from "@nextui-org/input";
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
} from "@nextui-org/react";
import React, { useState } from "react";

type Props = {};

const Navbar = (props: Props) => {
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
            <p className="font-bold text-inherit">{SIGMA_WHOLESALE}</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {NAV_MENU_ITEMS.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                className="w-full"
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
          type="text"
          label="Search"
          labelPlacement="inside"
        />
        </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Sign In</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Register
            </Button>
          </NavbarItem>
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
