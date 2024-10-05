'use client'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
type breadcrumbProps ={
  current:string
}

const BreadcrumbSkeleton = (props:breadcrumbProps) => {
  return (
    <Breadcrumbs className="mb-3">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>{props.current}</BreadcrumbItem>
    </Breadcrumbs>
  );
}

export default BreadcrumbSkeleton;