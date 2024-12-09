'use client'
import { Suspense } from 'react';
import { Pagination } from '@nextui-org/react';
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
  brand?: string;
  searchkey?: string;
  user?:string;
}

const Products = ({ products, totalPages, currentPage, size, category, brand, searchkey, user }: ProductsProps) => {
  const router = useRouter();
  console.log(brand, "brand");
  const handlePageChange = (page: number) => {
    const queryParams = new URLSearchParams();
    queryParams.set('page', page.toString());
    queryParams.set('size', size.toString());
    if (searchkey) queryParams.set('keyword', searchkey);

    const baseUrl = brand
      ? `/categories/tag/${brand}/products`
      : category
        ? `/categories/${category}/products`
        : '/products';

    console.log(brand, category, baseUrl, "baseUrl");

    const url = `${baseUrl}?${queryParams.toString()}`;
    router.push(url);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-large font-bold text-red-500 py-10">
        {searchkey ? searchkey.toUpperCase() : brand ? brand.toUpperCase() : category ? category.toUpperCase() : 'ALL PRODUCTS'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div className="w-full" key={index}>
            <Suspense fallback={<SkeletonProductCard />} key={index}>
              <ProductCard
                img={product.displayImage?.imageUrl}
                title={product.name}
                price={product.price ? ("$" + product.price) : ''}
                details={product.details}
                stockStatus={product.status}
                user={user}
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
