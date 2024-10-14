'use client'

import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";
import React from "react";

const SkeletonProductCard = () => {
  return (
    <Card shadow="sm" className="max-w-[230px]">
      <CardBody className="overflow-visible p-0">
        <Skeleton className="w-full h-[140px] rounded=lg" />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-1/5 rounded-lg" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonProductCard;
