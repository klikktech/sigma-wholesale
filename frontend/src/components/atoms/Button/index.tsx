"use client"; 
import { ButtonProps, Button as NextUIButton } from "@nextui-org/react";
import React from "react";

interface Props extends ButtonProps {
  scrollTargetId?: string;
}
const Button = (props: Props) => {
  const handleClick = () => {
    if (props.scrollTargetId) {
      const section = document.getElementById(props.scrollTargetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return <NextUIButton {...props} className={`text-black ${props.className}`} onClick={handleClick}>{props.children}</NextUIButton>;
};

export default Button;
