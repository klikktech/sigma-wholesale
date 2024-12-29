import ErrorComponent from '@/components/atoms/ErrorComponent';
import UnauthorizedError from '@/components/molecules/Error';
import Products from '@/components/organisms/Products';
import { axios } from '@/lib/axios';
import React from 'react';

interface Props {
  params: { category: string };
  searchParams: { page?: string; size?: string };
}

const CategoryProductsPage = async ({ params, searchParams }: Props) => {
  let products = [];
  let totalPages: number=0;
  const page = searchParams.page ? parseInt(searchParams.page) : 0;
  const size = searchParams.size ? parseInt(searchParams.size) : 16;
  const { category } = params;

  const response = await axios.products.getCategoryProducts(category, page, size);
  if ('error' in response) {
    const { error } = response;
    if (error.message?.includes('Unauthorised')) {
      return <UnauthorizedError />
    } else {
      throw new Error(error.message)
    }
  }
  if ('data' in response) {
    const { data } = response;
    products = data.content;
    totalPages = data.totalPages;
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