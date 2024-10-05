import { Avatar, Link } from "@nextui-org/react";
import { color } from "framer-motion";
import router from "next/router";

const SideNav = () => {
    return <>
        <div className="flex flex-col justify-between" style={{ height: "100vh", backgroundColor: '#f4f4f5' }}>
            <div className="flex flex-col gap-5 px-3">
                <p className="py-3 font-bold text-inherit">
                    Sigma Wholesale
                </p>
                <Link href="/users">
                    <div className="flex gap-2" style={{color:'black'}}>
                        <span className="material-symbols-rounded">group</span>
                        <span>Users</span>
                    </div>
                </Link>
                <Link href="/products" style={{color:'black'}}>
                    <div className="flex gap-2">
                        <span className="material-symbols-rounded">package_2</span>
                        <span>Products</span>
                    </div>
                </Link>
                <Link href="/orders" style={{color:'black'}}>
                    <div className="flex gap-2">
                        <span className="material-symbols-rounded">shopping_cart</span>
                        <span>Orders</span>
                    </div>
                </Link>
            </div>
            <div className="flex gap-2 m-2 p-2 items-center justify-around" style={{ border: "1px solid #949191", borderRadius: "5px" }}>
                <Avatar className="w-1/6" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
                <span className="w-4/6">Ravi kalyan</span>
                <span className="material-symbols-rounded w-1/6">logout</span>
            </div>
        </div>
    </>
}

export default SideNav;