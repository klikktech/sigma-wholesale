import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React from "react";

interface Props {
  img: string;
  title: string;
  price: string;
}

const ProductCard = (props: Props) => {
  return (
    <>
      <Card shadow="sm" className="max-w-[300px]">
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={props.title}
            className="w-full object-cover h-[140px]"
            src={props.img}
          />
        </CardBody>
        <CardFooter className="text-small justify-between">
          <b className="title">{props.title}</b>
          <p className="text-default-500">{props.price}</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
