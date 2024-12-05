import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes"
import { redirect } from "next/navigation"

const EditProductPage = () => {
    redirect(PRODUCTS_PAGE_ROUTE)
}

export default EditProductPage