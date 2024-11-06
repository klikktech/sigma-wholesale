import Products from '@/components/organisms/Products'
import { axios } from '@/lib/axios';
import React from 'react'

const ProductsPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  let products = []
  let totalPages: number
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const size = 16;

  try {
    const { data, error } = await axios.products.getAllProducts(page, size);
    console.log(data, error)

    if (data) {
      products = data.content;
      totalPages = data.totalPages
    } else {
      return <div>No products available</div>;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>;
  }
  return (
    <Products products={products} totalPages={totalPages} currentPage={page} size={size} />
  )
}

export default ProductsPage;