"use client";
import { INavItem } from "@/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItem = ({ item }: { item: INavItem }) => {
  const pathname = usePathname();
  return (
    <Link href={item.path as string}>
      <div
        className={`w-full hover:bg-shadow rounded-lg p-2 flex gap-3 text-black ${
          pathname.includes(item.path as string) ? "bg-shadow" : ""
        }`}
      >
        <span className="material-symbols-rounded w-[24px]">{item.icon}</span>
        <span>{item.label}</span>
      </div>
    </Link>
  );
};

export default NavItem;
