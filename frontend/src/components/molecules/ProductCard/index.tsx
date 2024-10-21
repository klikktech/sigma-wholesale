import { Button, Image } from "@nextui-org/react";

interface Props {
  img: string;
  title: string;
  price: string;
}

const ProductCard = (props: Props) => {
  return (
    <>
      {/* <Card shadow="sm" className="max-w-[230px] w-100">
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

          <div className="text-small justify-between">
            <b className="title">{props.title}</b>
            <p className="text-default-500">{props.price}</p>
          </div>
          <div className="text-center">
          <Button color="primary">Shop now</Button>
          </div>

      </Card> */}
    <div className="max-w-60 bg-gray-200 text-black rounded-xl shadow-lg">
      <div className="relative">
        <Image
          className="w-full rounded-lg"
          src={props.img}
          alt={props.title}
        />
      </div>
      <div className="mt-2 p-4">
      <div className="flex">
        <h3 className="text-sm font-semibold h-10 overflow-hidden line-clamp-2">{props.title}</h3>
        <p className="text-gray-400">{props.price}</p>
      </div>
      <Button color="primary" className="mt-4 w-full text-black py-2 rounded-lg hover:bg-primary-300">
        Add to cart
      </Button>
      </div>
    </div>
    </>
  );
};

export default ProductCard;
