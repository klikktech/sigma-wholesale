'use client'
import { Suspense } from 'react';
import { Card, CardBody, Pagination } from '@nextui-org/react';
import { Product } from '@/utils/types';
import ProductCard from '@/components/molecules/ProductCard';
import SkeletonProductCard from '@/components/molecules/ProductCard/SkeletonCard';
import { useRouter } from 'next/navigation';

interface ProductsProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
  size: number;
  category?: string;
  searchkey?:string;
}

const Products = ({products, totalPages, currentPage, size, category, searchkey}: ProductsProps) => {
  const router = useRouter();
  
  const handlePageChange = (page: number) => {
    const baseUrl = category 
      ? `/categories/${category}/products`
      : '/products';
    
    router.push(`${baseUrl}?page=${page}&size=${size}`);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-large font-bold text-red-500 py-10">
        {searchkey ? searchkey.toUpperCase() : (category ? category.toUpperCase() : 'ALL PRODUCTS')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product,index) => (
          <div className="w-full" key={index}>
            <Suspense fallback={<SkeletonProductCard />}>
              <ProductCard
                img={product.displayImage}
                title={product.name}
                price={product.price ? ("$" + product.price) : ''}
                details={product.details}
                stockStatus={product.status}
              />
            </Suspense>
          </div>
        ))}
      </div>

      <Pagination
        showControls 
        total={totalPages}
        initialPage={currentPage}
        page={currentPage}
        onChange={handlePageChange}
        className="my-8"
      />
    </div>
  );
};

export default Products;
