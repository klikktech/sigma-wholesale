"use client";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface Props {
  path?: string[];
}

const Breadcrumb = ({ path }: Props) => {
  const pathname = usePathname();
  const getPathBasedOnLocation = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments;
  };
  const breadcrumbItems = path || getPathBasedOnLocation();

  return (
    <Breadcrumbs>
      {breadcrumbItems.map((item, index) => {
        const href = "/" + breadcrumbItems.slice(0, index + 1).join("/");
        return (
          <BreadcrumbItem
            key={`breadcrumb-${item}`}
            href={href}
            className="capitalize"
          >
            {item}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
