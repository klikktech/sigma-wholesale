import ErrorComponent from '@/components/atoms/ErrorComponent';
import Products from '@/components/organisms/Products'
import { axios } from '@/lib/axios';
import { getUser } from '@/lib/axios/session';
import React from 'react'

const ProductsPage = async ({ searchParams }: { searchParams: { page?: string, keyword?: string } }) => {
  const user = await getUser()
  const page = searchParams.page ? parseInt(searchParams.page) : 0;
  const size = 16;
  const keyword = searchParams.keyword || '';

  if (isNaN(page) || page < 0) {
    return <ErrorComponent message="Invalid page number" />;
  }

  const response = keyword
    ? await axios.products.getSearchProductsList(keyword, page, size)
    : await axios.products.getAllProducts(page, size);

  const { data, error } = response;

  if (error) {
    throw new Error(error?.message);
  }

  if (!data || !data.content || data.content.length === 0) {
    return <ErrorComponent message="No products available" />;
  }

  const productProps = {
    products: data.content,
    totalPages: data.totalPages || 1,
    currentPage: page,
    size,
    user: user?.email,
    ...(keyword && { searchkey: keyword })
  };

  return <Products {...productProps} />;

}

export default ProductsPage;