import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const brands = [
    { imageUrl: 'https://via.placeholder.com/150?text=Weighmax', name: 'Weighmax' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+2', name: 'Brand 2' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+3', name: 'Brand 3' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+4', name: 'Brand 4' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+5', name: 'Brand 5' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+6', name: 'Brand 6' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+7', name: 'Brand 7' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+8', name: 'Brand 8' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+9', name: 'Brand 9' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+10', name: 'Brand 10' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+11', name: 'Brand 11' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+12', name: 'Brand 12' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+13', name: 'Brand 13' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+14', name: 'Brand 14' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+15', name: 'Brand 15' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+16', name: 'Brand 16' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+17', name: 'Brand 17' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+18', name: 'Brand 18' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+19', name: 'Brand 19' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+20', name: 'Brand 20' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+21', name: 'Brand 21' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+22', name: 'Brand 22' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+23', name: 'Brand 23' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+24', name: 'Brand 24' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+25', name: 'Brand 25' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+26', name: 'Brand 26' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+27', name: 'Brand 27' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+28', name: 'Brand 28' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+29', name: 'Brand 29' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+30', name: 'Brand 30' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+31', name: 'Brand 31' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+32', name: 'Brand 32' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+33', name: 'Brand 33' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+34', name: 'Brand 34' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+35', name: 'Brand 35' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+36', name: 'Brand 36' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+37', name: 'Brand 37' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+38', name: 'Brand 38' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+39', name: 'Brand 39' },
    { imageUrl: 'https://via.placeholder.com/150?text=Brand+40', name: 'Brand 40' },
  ];
  
const Brands = () => {

    return (
        <div className="my-3">
            <h1 className="my-2 text-xl">OTHER BRANDS</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {brands.map((brand, index) => (
                    <Link href={`/categories/tag/${brand.name}/products?page=1&size=16`} className="brand-item" key={index}>
                        <Image src={brand.imageUrl} width={100} height={100} alt={brand.name} className="w-full h-auto" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Brands;
