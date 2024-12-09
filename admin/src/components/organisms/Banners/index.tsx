'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Modal, Image, ModalHeader, ModalBody, ModalFooter, ModalContent, Spacer, Textarea } from '@nextui-org/react';
import { addBanner, deleteBanner } from './action';


interface Banner {
    id: string;
    image: string;
    title: string;
    description: string;
    type: string;
}

const Banners = ({ bannersList }: { bannersList: Banner[] }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBanner, setNewBanner] = useState({
        image: '',
        title: '',
        description: '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleAddBanner = async () => {
        const formData = new FormData();
        if (selectedFile && newBanner.title && newBanner.description) {
            formData.append('image', selectedFile);

            const payload = {
                title: newBanner.title,
                description: newBanner.description,
            };
            formData.append('banner', JSON.stringify(payload));

            const result = await addBanner(formData);

            if (result?.success) {
                setIsModalOpen(false);
                setNewBanner({ image: '', title: '', description: '' });
                setSelectedFile(null);
                router.refresh();
            } else {
                console.error(result?.error);
            }
        }
    };

    const handleDeleteBanner = async (id: string) => {
        const result = await deleteBanner(id);
        if (result?.success) {
            router.refresh();
        } else {
            console.error(result?.error);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const image = URL.createObjectURL(file);
            setNewBanner({ ...newBanner, image });
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-end items-center mb-6 gap-4">
                <Button
                    color="primary"
                    endContent={
                        <span className="material-symbols-rounded">add</span>
                    }
                    onPress={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto"
                >
                    Add Banner
                </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {bannersList.length > 0 ? bannersList.map((banner) => (
                    <Card key={banner.id} className="sm:p-4">
                        <div className="relative">
                            {banner.type === "IMAGE" &&
                                <Image
                                    src={banner.image}
                                    alt={banner.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            }
                            {banner.type === "VIDEO" &&
                                <video src={banner.image}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            }
                            <Button
                                isIconOnly
                                color="danger"
                                size="sm"
                                className="absolute top-2 right-2 z-10"
                                onPress={() => handleDeleteBanner(banner.id)}
                            >
                                <span className="material-symbols-rounded">delete</span>
                            </Button>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">{banner.title}</h3>
                            <p className="text-gray-600 mt-2">{banner.description}</p>
                        </div>
                    </Card>
                )) : <p>No banners found</p>}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                placement="center"
                className="mx-4 sm:mx-0"
                scrollBehavior="inside"
            >
                <ModalContent className="max-h-[90vh] sm:max-h-[80vh]">
                    {(onClose) => (
                        <>
                            <ModalHeader className="px-4 sm:px-6">
                                <h3 className="text-base sm:text-lg font-semibold">Add New Banner</h3>
                            </ModalHeader>
                            <ModalBody className="px-4 sm:px-6">
                                <form onSubmit={handleAddBanner}>
                                    <div className="space-y-4">
                                        <div className="mb-4">
                                            <label className="text-sm">Brand Image</label>
                                            <Spacer y={1} />
                                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                                                <input
                                                    type="file"
                                                    accept="image/*, video/*"
                                                    onChange={handleFileSelect}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    required
                                                />
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className='material-symbols-rounded text-gray-400'>
                                                        {selectedFile?.type.includes('image') && 'image'}
                                                        {selectedFile?.type.includes('video') && 'video'}
                                                    </span>
                                                    <span className="text-gray-600">
                                                        {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                                                    </span>
                                                </div>
                                                {!selectedFile && (
                                                    <p className="text-sm text-gray-500 text-center mt-2">
                                                        PNG, JPG, GIF up to 10MB
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <Spacer y={4} />
                                        <Input
                                            label="Title"
                                            labelPlacement="outside"
                                            placeholder="Enter banner title"
                                            value={newBanner.title}
                                            onChange={(e) =>
                                                setNewBanner({ ...newBanner, title: e.target.value })
                                            }
                                            classNames={{
                                                label: "text-sm sm:text-base",
                                                input: "text-sm sm:text-base"
                                            }}
                                            required
                                        />
                                        <Spacer y={4} />
                                        <Textarea
                                            label="Description"
                                            rows={3}
                                            labelPlacement="outside"
                                            placeholder="Enter banner description"
                                            value={newBanner.description}
                                            onChange={(e) =>
                                                setNewBanner({ ...newBanner, description: e.target.value })
                                            }
                                            classNames={{
                                                label: "text-sm sm:text-base",
                                                input: "text-sm sm:text-base"
                                            }}
                                            required
                                        />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter className="px-4 sm:px-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                    className="w-full sm:w-auto order-2 sm:order-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={handleAddBanner}
                                    className="w-full sm:w-auto order-1 sm:order-2"
                                    isDisabled={!selectedFile || !newBanner.title || !newBanner.description}
                                >
                                    Add Banner
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Banners;
