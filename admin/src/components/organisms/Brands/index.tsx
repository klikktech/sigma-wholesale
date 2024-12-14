'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Brand } from '@/utils/types';
import { updateBrand, createBrand, deleteBrand } from './action';
import { Input, Spacer, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { BRANDS_PAGE_ROUTE } from '@/utils/routes';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button';

const Brands = ({ brands }: { brands: Brand[] }) => {
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [newBrandName, setNewBrandName] = useState('');
    const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
    const router = useRouter();


    const handleEditClick = (brand: Brand) => {
        setEditingBrand(brand);
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setNewImage(e.target.files[0]);
        }
    };
    const handleSubmit = async () => {
        console.log(" handleSubmit ")
        const formData = new FormData();
        if (newImage) {
            formData.append('image', newImage);
        }

        let result;
        if (editingBrand) {
            formData.append('name', editingBrand.name);
            result = await updateBrand(formData);
        } else {
            formData.append('name', newBrandName);
            result = await createBrand(formData);
        }

        if (result?.success) {
            setEditingBrand(null);
            setIsCreating(false);
            setNewImage(null);
            setNewBrandName('');
            router.push(BRANDS_PAGE_ROUTE);
            router.refresh();
        } else {
            console.error('Error updating/creating brand:', result?.error);
        }
    };

    const handleDeleteConfirm = async () => {
        if (brandToDelete) {
            const result = await deleteBrand(brandToDelete.name);
            if (result?.success) {
                setBrandToDelete(null);
                router.push(BRANDS_PAGE_ROUTE);
                router.refresh();
            } else {
                console.error('Error deleting brand:', result?.error);
            }
        }
    };

    return (
        <div className="my-3">
            <div className="flex justify-end mb-4">
                <Button  onClick={() => setIsCreating(true)}
                    endContent={
                      <span className="material-symbols-rounded">add</span>
                    }
                  >
                    Add Brand
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {brands.map((brand: Brand, index: number) => (
                    <div key={index} className="relative group">
                        <Image
                            src={brand.image}
                            width={100}
                            height={100}
                            alt={brand.name}
                            className="w-full max-h-36 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 items-center justify-center">
                            <button
                                onClick={() => handleEditClick(brand)}
                                className="hover:underline"
                            >
                                <span className="material-symbols-rounded">edit</span>
                            </button>
                            <button
                                onClick={() => setBrandToDelete(brand)}
                                className="hover:underline text-red-400"
                            >
                                <span className="material-symbols-rounded">delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal 
                isOpen={!!editingBrand || isCreating} 
                onClose={() => {
                    setEditingBrand(null);
                    setIsCreating(false);
                }}
                size="md"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>{editingBrand ? 'Edit Brand' : 'Add Brand'}</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit}>
                                    <div className="my-4">
                                        <label className="text-sm">Brand Name</label>
                                        <Spacer y={1} />
                                        <Input
                                            type="text"
                                            value={editingBrand ? editingBrand.name : newBrandName}
                                            readOnly={editingBrand ? true : false}
                                            onChange={(e) => editingBrand 
                                                ? setEditingBrand({ ...editingBrand, name: e.target.value })
                                                : setNewBrandName(e.target.value)
                                            }
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-sm">Brand Image</label>
                                        <Spacer y={1} />
                                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="flex items-center justify-center gap-2">
                                                <span className='material-symbols-rounded text-gray-400'>
                                                    image
                                                </span>
                                                <span className="text-gray-600">
                                                    {newImage ? newImage.name : 'Click to upload or drag and drop'}
                                                </span>
                                            </div>
                                            {!newImage && (
                                                <p className="text-sm text-gray-500 text-center mt-2">
                                                    Add image of brand
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button 
                                    color="default" 
                                    variant="light" 
                                    onPress={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    color="primary"
                                    isDisabled={!newImage}
                                    onPress={handleSubmit}
                                >
                                    {editingBrand ? 'Update' : 'Create'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal 
                isOpen={!!brandToDelete} 
                onClose={() => setBrandToDelete(null)}
                size="sm"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Delete Brand</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete {brandToDelete?.name}? This action cannot be undone.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button 
                                    color="default" 
                                    variant="light" 
                                    onPress={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    color="danger" 
                                    onPress={handleDeleteConfirm}
                                >
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Brands;
