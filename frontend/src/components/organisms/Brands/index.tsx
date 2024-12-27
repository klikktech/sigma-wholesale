import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { axios } from '@/lib/axios';
import { Brand } from '@/utils/types';

const Brands = async () => {

    const { data, error } = await axios.products.getBrandsList();
    if (error) {
        throw new Error(error.message)
    }

    return (
        <section className="max-w-7xl mx-auto" id="brands-section">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">OTHER BRANDS</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {data.map((brand: Brand, index: number) => (
                    <Link
                        href={`/products/brands/${brand.name}?page=0&size=16`}
                        key={index}
                        className="group relative bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out border border-gray-300"
                    >
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300 ease-in-out" />

                        <div className="relative aspect-square w-full flex items-center justify-center p-4 overflow-hidden">
                            <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                                <Image
                                    src={brand.image}
                                    fill
                                    alt={brand.name}
                                    className="object-contain"
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                                />
                            </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-2 bg-black bg-opacity-50 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-xs text-center truncate uppercase">
                                {brand.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Brands;
