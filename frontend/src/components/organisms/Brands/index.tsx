import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { axios } from '@/lib/axios';
import { Brand } from '@/utils/types';
import { Spacer } from '@nextui-org/react';

const Brands = async () => {

    const { data, error } = await axios.products.getBrandsList();
    if (error) {
        throw new Error(error.message)
    }

    return (
        <div className="my-3">
            <h1 className="my-2 text-xl">OTHER BRANDS</h1>
            <Spacer y={5} />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {data.map((brand: Brand, index: number) => (
                    <Link href={`/categories/tag/${brand.name}/products?page=0&size=16`} className="brand-item" key={index}>
                        <Image src={brand.image} width={100} height={100} alt={brand.name} className="w-full max-h-36 object-cover" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Brands;
