import ErrorComponent from '@/components/atoms/ErrorComponent';
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
  const page = searchParams.page ? parseInt(searchParams.page) : 0;
  const size = searchParams.size ? parseInt(searchParams.size) : 16;
  const { category } = params;

  const response = await axios.products.getCategoryProducts(category, page, size);
  if ('data' in response) {
    const { data } = response;
    products = data.content;
    totalPages = data.totalPages;
  } else {
    throw new Error(response.error?.message);
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