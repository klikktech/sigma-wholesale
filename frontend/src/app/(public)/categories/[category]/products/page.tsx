import Products from '@/components/organisms/Products';
import { axios } from '@/lib/axios';
import React from 'react';

interface Props {
  params: { category: string };
  searchParams: { page?: string; size?: string };
}

const CategoryProductsPage = async ({ params, searchParams }: Props) => {
  let products = [];
  let totalPages: number;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const size = searchParams.size ? parseInt(searchParams.size) : 16;
  const { category } = params;

  try {
    const { data, error } = await axios.products.getCategoryProducts(category, page, size);
    
    if (data) {
      products = data.content;
      totalPages = data.totalPages;
    } else {
      return <div>No products available</div>;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>;
  }

  return (
    <Products 
      products={products} 
      totalPages={totalPages} 
      currentPage={page} 
      size={size} 
      category={category} 
    />
  );
};

export default CategoryProductsPage; 