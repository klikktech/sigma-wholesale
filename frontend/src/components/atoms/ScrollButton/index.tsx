"use client"; 
import { ButtonProps, Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { HOME_PAGE_ROUTE } from "@/utils/urls";

interface Props extends ButtonProps {
  scrollTargetId?: string;
}

const ScrollButton = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (!props.scrollTargetId) return;

    if (pathname === HOME_PAGE_ROUTE) {
      const section = document.getElementById(props.scrollTargetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`${HOME_PAGE_ROUTE}#${props.scrollTargetId}`);
    }
  };

  return props.type === "button" ? (
    <Button {...props} className="text-black" onClick={handleClick}>
      {props.children}
    </Button>
  ) : (
    <Button variant="light" className={`text-black ${props.className}`} onClick={handleClick}>
      {props.children}
    </Button>
  );
};

export default ScrollButton;
