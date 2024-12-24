import { Tooltip, User } from "@nextui-org/react";
import logo from "@/assets/sigma-logo-removebg-preview.png";
import Image from "next/image";
import { INavItem, IUser } from "@/utils/types";
import Button from "@/components/atoms/Button";
import { signOutAction } from "@/app/(auth-pages)/actions";
import NavItem from "@/components/organisms/SideNav/NavItem";

interface Props {
  items: INavItem[];
  user: IUser;
}

const SideNav = ({ items, user }: Props) => {
  return (
    <div className="flex flex-col justify-between max-w-72 min-w-64 bg-card_hover h-svh">
      <div className="flex flex-col gap-3 px-3">
        <p className="py-3 font-bold text-inherit">
          <Image alt="sidenav brand" src={logo} height={50} />
        </p>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <NavItem item={item} key={`navitem-${item.path}`} />
          ))}
        </div>
      </div>
      <div className="flex gap-2 m-2 p-2 items-center justify-around border rounded-lg">
        <div className="flex items-center gap-2 line-clamp-1">
          <User
            avatarProps={{
              radius: "full",
              className: "",
              src: user.image,
              showFallback: true,
              fallback: (
                <span className="material-symbols-rounded text-default-500">
                  person
                </span>
              ),
            }}
            description={user.email}
            name={<span className="capitalize">{user.name}</span>}
          />
        </div>
        <form>
          <Tooltip content="Logout" showArrow offset={0}>
            <Button
              type="submit"
              isIconOnly
              variant="faded"
              className="border-0 text-black"
              formAction={signOutAction}
            >
              <span className="material-symbols-rounded text-default-500 cursor-pointer">
                logout
              </span>
            </Button>
          </Tooltip>
        </form>
      </div>
    </div>
  );
};

export default SideNav;
