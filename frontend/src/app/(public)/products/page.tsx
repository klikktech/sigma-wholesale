import Products from '@/components/organisms/Products'
import { axios } from '@/lib/axios';
import React from 'react'

const ProductsPage = async ({ searchParams }: { searchParams: { page?: string, keyword?: string } }) => {
  let products = []
  let totalPages: number
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const size = 16;
  const keyword = searchParams.keyword || '';

  try {
    let response;
    if (keyword) {
      response = await axios.products.getSearchProductsList(keyword, page, size);
    } else {
      response = await axios.products.getAllProducts(page, size);
    }
    
    const { data, error } = response;
    console.log(data, "in products page.tsx")

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

  const productProps = { products, totalPages, currentPage: page, size };

  return (
    <Products 
      {...productProps} 
      {...(keyword && { searchkey: keyword })}
    />
  )
}

export default ProductsPage;