"use client"; 
import { ButtonProps, Button } from "@nextui-org/react";
import React from "react";

interface Props extends ButtonProps {
  scrollTargetId?: string;
}
const ScrollButton = (props: Props) => {
  const handleClick = () => {
    if (props.scrollTargetId) {
      const section = document.getElementById(props.scrollTargetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return <Button {...props} className={`text-black ${props.className}`} onClick={handleClick}>{props.children}</Button>;
};

export default ScrollButton;
