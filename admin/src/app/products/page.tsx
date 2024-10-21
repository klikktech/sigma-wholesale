import BreadcrumbSkeleton from "@/components/molecules/BreadCrumbSkeleton"
import UserTable from "@/components/molecules/UserTable"
import { User } from "@/components/molecules/UserTable/columns"

async function getUsers(): Promise<User[]> {
    const res = await fetch(
        'https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users'
    )
    const data = await res.json()
    return data
}

export default async function Products() {
    const users = await getUsers()

    return (
        <>
            <BreadcrumbSkeleton current={'Products'} />
            <section className='py-2'>
                <div className='container'>
                    <UserTable users={users} />
                </div>
            </section>
        </>
    )
}