import { ButtonProps, Button as NextUIButton } from "@nextui-org/react";
import React from "react";

interface Props extends ButtonProps {}

const Button = (props: Props) => {
  return <NextUIButton {...props}>{props.children}</NextUIButton>;
};

export default Button;
