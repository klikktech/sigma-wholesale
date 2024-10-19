import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import userIcon from '@/assets/user-icon.png'
export default function AvatarMenu() {
    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <User
                        as="button"
                        avatarProps={{
                            // isBordered: true,
                            showFallback:true,
                            src: `${userIcon}`
                        }}
                        className="transition-transform"
                        description="@tonyreichert"
                        name="Tony Reichert"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">@tonyreichert</p>
                    </DropdownItem>
                    <DropdownItem key="account">
                        My Account
                    </DropdownItem>
                    <DropdownItem key="orders">
                        My Orders
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}