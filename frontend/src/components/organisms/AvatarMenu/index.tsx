import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User, Link } from "@nextui-org/react";
import userIcon from '@/assets/user-icon.png'
import { signOutAction } from "@/app/(auth)/login/action";
import { IUser } from "@/utils/types";
import { ACCOUNT_PAGE_ROUTE, ORDERS_PAGE_ROUTE } from "@/utils/urls";


export default function AvatarMenu({ user }: { user: IUser }) {
    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <User
                        as="button"
                        avatarProps={{
                            showFallback: true,
                            src: typeof userIcon === 'string' ? userIcon : undefined
                        }}
                        className="transition-transform"
                        description={user.email}
                        name={user.name}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="account">
                        <Link className="w-full text-black" href={ACCOUNT_PAGE_ROUTE}>My Account</Link>
                    </DropdownItem>
                    <DropdownItem key="orders">
                        <Link className="w-full text-black" href={ORDERS_PAGE_ROUTE}>My Orders</Link>
                    </DropdownItem>

                    <DropdownItem key="logout" className="text-danger" color="danger">
                        <form action={signOutAction}>
                            <button
                                type="submit"
                                className="w-full text-left"
                            >   Log Out
                            </button>
                        </form>
                    </DropdownItem>

                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
