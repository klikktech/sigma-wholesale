import { PRODUCT_VIEW_PAGE_ROUTE } from "@/utils/urls";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";

interface Props {
  img: any;
  title: string;
  price: string;
  details:string;
}

const ProductCard = (props: Props) => {
  return (
    <>
    <div className="max-w-60 bg-gray-200 text-black rounded-xl shadow-lg">
    <Image
          className="w-full rounded-lg h-[250px] object-fill"
          src={props.img}
          alt={props.title}
        />
      <div className="mt-2 p-4">
      <div className="flex">
        <h3 className="text-sm font-semibold h-10 overflow-hidden line-clamp-2">{props.title}</h3>
        <p className="text-gray-400">{props.price}</p>
      </div>
      <Button color="primary" className="mt-4 w-full text-black py-2 rounded-lg hover:bg-primary-300">
        <Link href={PRODUCT_VIEW_PAGE_ROUTE(props.details)}>Shop now</Link>
      </Button>
      </div>
    </div>
    </>
  );
};

export default ProductCard;
