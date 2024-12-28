"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Select, SelectItem, Switch, Textarea } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";
import FormMessage from "@/components/molecules/FormMessage";
import Link from "next/link";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes";
import Image from "next/image";
import FormSubmitButton from "@/components/molecules/FormSubmitButtton";
import Video from "@/components/atoms/Video";
import { ProductDetails, Variation } from "@/utils/types";
import { editProductAction } from "@/components/organisms/forms/Products/EditProductForm/action";
import ProductVariations from "@/components/organisms/forms/Products/EditProductForm/ProductVariations";
// import { addProductAction } from "@/components/organisms/forms/products/AddProductForm/action";


const generateDataUrlForDisplayImage = (
    file: File,
    callback: (imageUrl: string) => void
) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result as string);
    reader.readAsDataURL(file);
};

const generateDataUrlForImages = (
    files: FileList,
    callback: (imageUrl: string[]) => void
) => {
    const fileReaders: FileReader[] = [];
    const urls: string[] = [];
    let loaded = 0;

    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        fileReaders.push(reader);
        reader.onload = () => {
            urls[index] = reader.result as string;
            loaded++;
            if (loaded === files.length) {
                callback(urls);
            }
        };
        reader.readAsDataURL(file);
    });
};

const VideoPreview = ({ dataUrl }: { readonly dataUrl: string }) => {
    return (
        <Video
            src={dataUrl}
        // alt="preview"
        // className="rounded-lg w-full h-full object-cover"
        />
    );
};

const ImagePreview = ({ dataUrl }: { readonly dataUrl: string }) => {
    return (
        <Image
            src={dataUrl}
            width={200}
            height={200}
            alt="preview"
            className="rounded-lg w-full h-full"
        />
    );
};

const DisplayImageCard = ({
    dataUrl,
    displayImageFileInput,
}: {
    readonly dataUrl: string;
    readonly displayImageFileInput: React.RefObject<HTMLInputElement>;
}) => {
    const imagePreview = dataUrl ? (
        <ImagePreview dataUrl={dataUrl} />
    ) : (
        <p className="flex gap-2 text-default-500">
            <span className="material-symbols-rounded">add_a_photo</span>Upload new
            display image
        </p>
    );

    return (
        <div className="w-full relative">
            <div className="flex items-center justify-center w-full h-[500px] space-x-4 rounded-lg border p-1">
                {imagePreview}
            </div>
            <button
                onClick={() => displayImageFileInput.current?.click()}
                className="w-full absolute inset-0"
                type="button"
            ></button>
        </div>
    );
};

interface EditProductFormProps {
    product: ProductDetails;
    categories: any;
    brands: any;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, categories, brands }) => {
    const formAction = async (prevState: any, formData: FormData) => {
        if (!displayImageFile && dataUrl) {
            formData.set('displayImageUrl', dataUrl);
        }

        if (existingImageUrls.length > 0) {
            formData.set('existingImageUrls', JSON.stringify(existingImageUrls));
        }

        newImageFiles.forEach(file => {
            formData.append('newImages', file);
        });

        return editProductAction(product.details as string, undefined, formData);
    };

    const [state, dispatch] = useFormState(formAction, undefined);
    const [variations, setVariations] = useState<Variation[]>(product.variations || []);
    const formRef = useRef<HTMLFormElement>(null);


    const displayImageFileInput = useRef<HTMLInputElement>(null);
    const imagesFileInput = useRef<HTMLInputElement>(null);
    const [displayImageFile, setDisplayImageFile] = useState<File | null>(null);
    const [dataUrl, setDataUrl] = useState<string | null>(
        product.displayImage?.imageUrl || null
    );
    const [existingImageUrls, setExistingImageUrls] = useState<string[]>(
        product.images?.map((img:any) => img.imageUrl) || []
    );
    const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
    const [newImageUrls, setNewImageUrls] = useState<string[]>([]);

    const [showVariations, setShowVariations] = useState(product.productType === "VARIABLE");
    // const [selectedCategories, setSelectedCategories] = useState<string[]>(
    //     product.category ? [product.category] : []
    // );
    // const [availableSubCategories, setAvailableSubCategories] = useState<any[]>([]);

    // const handleCategoryChange = (values: string[]) => {
    //     setSelectedCategories(values);
    //     const subCategories = values.reduce((acc: any[], categoryName: string) => {
    //         const category = categories.find((cat: any) => cat.name === categoryName);
    //         return [...acc, ...(category?.childCategories || [])];
    //     }, []);
    //     setAvailableSubCategories(subCategories);
    // };

    const handleDisplayImageFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setDisplayImageFile(file);
            generateDataUrlForDisplayImage(file, setDataUrl);
        }
    };

    const handleImagesFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newFiles = Array.from(files);
            setNewImageFiles(prev => [...prev, ...newFiles]);
            generateDataUrlForImages(files, (newUrls) => {
                setNewImageUrls(prev => [...prev, ...newUrls]);
            });
        }
    };

    const handleProductTypeChange = (value: string) => {
        console.log(value, "Product Type")
        setShowVariations(value === "VARIABLE");
    };

    const handleVariationsChange = (newVariations: Variation[]) => {
        setVariations(newVariations);
        if (formRef.current) {
            const hiddenInput = formRef.current.querySelector('input[name="variations"]') as HTMLInputElement;
            if (hiddenInput) {
                hiddenInput.value = JSON.stringify(newVariations);
            }
        }
    };

    const removeImage = (index: number, isExisting: boolean) => {
        if (isExisting) {
            setExistingImageUrls(prev => prev.filter((_, i) => i !== index));
        } else {
            setNewImageFiles(prev => prev.filter((_, i) => i !== index));
            setNewImageUrls(prev => prev.filter((_, i) => i !== index));
        }
    };

    // Extract category names from product.categories
    const defaultCategories = product.categories
        ?.filter((cat: any) => cat.type === 'product_cat')
        ?.map((cat: any) => cat.name) || [];

    return (
        <form ref={formRef} action={dispatch}>
            <div className="flex gap-4">
                <div className="flex flex-col w-full gap-4">
                    <div className="flex w-full gap-2">
                        <div className="w-full">
                            <label className="block text-sm font-medium mb-1" htmlFor="name">
                                Product Name
                            </label>
                            <Input type="text" id="name" name="name" defaultValue={product.name} readOnly required />
                        </div>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="price"
                            >
                                Price
                            </label>
                            <Input type="text" id="price" name="price" defaultValue={product.price?.toString()} />
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-medium mb-1" htmlFor="salePrice">
                                Sale Price
                            </label>
                            <Input type="text" id="salePrice" name="salePrice" defaultValue={product.salePrice?.toString()} />
                        </div>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <label className="block text-sm font-medium mb-1" htmlFor="sku">
                                Sku
                            </label>
                            <Input type="text" id="sku" name="sku" defaultValue={product.sku} readOnly required />
                        </div>
                        <div className="w-full">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="brand"
                            >
                                Brand
                            </label>
                            <Select
                                id="brand"
                                name="brand"
                                defaultSelectedKeys={[product.brand]}
                                required
                            >
                                {brands?.map((brand: any) => (
                                    <SelectItem key={brand.name} value={brand.name}>{brand.name}</SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="categories"
                            >
                                Category
                            </label>
                            <Select
                                id="categories"
                                name="categories"
                                required
                                selectionMode="multiple"
                                classNames={{
                                    base: "w-full",
                                    trigger: "h-auto min-h-[40px] p-1",
                                    value: "bg-default-100 px-2 py-1 rounded-md text-sm grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1",
                                    listbox: "max-h-[400px]"
                                }}
                                placeholder="Select categories"
                                defaultSelectedKeys={defaultCategories}
                            >
                                {categories?.map((category: any) => (
                                    <SelectItem key={category.name} value={category.name}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        {/* <div className="w-full">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="subCategory"
                            >
                                Sub Category
                            </label>
                            <Select
                                id="subCategory"
                                name="subCategory"
                                defaultSelectedKeys={[product.subCategory]}
                                isDisabled={!selectedCategories || availableSubCategories.length === 0}
                                required
                            >
                                {availableSubCategories.map((subCategory: any) => (
                                    <SelectItem key={subCategory.name} value={subCategory.name}>
                                        {subCategory.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div> */}
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="status"
                            >
                                Status
                            </label>
                            <Select
                                id="status"
                                name="status"
                                defaultSelectedKeys={[product.status]}
                                required
                            >
                                <SelectItem key="instock">In stock</SelectItem>
                                <SelectItem key="outofstock">Out of stock</SelectItem>
                            </Select>
                        </div>
                        <div className="w-full">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="productType"
                            >
                                Product Type
                            </label>
                            <Select
                                id="productType"
                                name="productType"
                                defaultSelectedKeys={[product.productType]}
                                onChange={(e) => handleProductTypeChange(e.target.value)}
                                required
                            >
                                <SelectItem key="SIMPLE">Simple</SelectItem>
                                <SelectItem key="VARIABLE">Variable</SelectItem>
                            </Select>
                        </div>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="displayStatus"
                            >
                                Display Status
                            </label>
                            <Select
                                id="displayStatus"
                                name="displayStatus"
                                defaultSelectedKeys={[product.displayStatus]}
                                required
                            >
                                <SelectItem key="publish">Publish</SelectItem>
                                <SelectItem key="trash">Trash</SelectItem>
                            </Select>
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-medium mb-1" htmlFor="stockQuantity">
                                Stock Quantity
                            </label>
                            <Input type="text" id="stockQuantity" name="stockQuantity" defaultValue={product.stockQuantity?.toString()} />
                        </div>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="boxQuantity"
                            >
                                Box Quantity
                            </label>
                            <Input type="text" id="boxQuantity" name="boxQuantity" defaultValue={product.boxQuantity?.toString()} />
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-medium mb-1" htmlFor="caseQuantity">
                                Case Quantity
                            </label>
                            <Input type="text" id="caseQuantity" name="caseQuantity" defaultValue={product.caseQuantity?.toString()} />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1" htmlFor="description">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            name="description"
                            rows={4}
                            defaultValue={product.description}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <Switch defaultSelected={product.isOnSale} name="isOnSale" id="isOnSale">
                            Add to Deals
                        </Switch>
                        <input type="hidden" name="isOnSale" value={formRef.current?.isOnSale} />
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="w-full">
                            <FormSubmitButton
                                pendingText="Updating product"
                                buttonText="Update Product"
                                className="w-full"
                            />
                        </div>
                        <Link className="w-full" href={PRODUCTS_PAGE_ROUTE}>
                            <Button className="w-full" color="default">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                    {state && <FormMessage message={state} />}
                </div>

                <div className="min-w-[500px]">
                    <input
                        className="hidden"
                        type="file"
                        name="displayImage"
                        id="displayImage"
                        onChange={handleDisplayImageFileChange}
                        ref={displayImageFileInput}
                        accept="image/*,video/*"
                    />
                    <input
                        className="hidden"
                        multiple
                        type="file"
                        name="images"
                        id="images"
                        accept="image/*,video/*"
                        onChange={handleImagesFileChange}
                        ref={imagesFileInput}
                    />

                    <div className="flex flex-col gap-2">
                        <DisplayImageCard
                            dataUrl={dataUrl ?? ""}
                            displayImageFileInput={displayImageFileInput}
                        />

                        {dataUrl && (
                            <div className="flex justify-end gap-2">
                                {existingImageUrls.map((imageUrl, index) => (
                                    <div key={`existing-${index}`} className="w-16 h-16 relative">
                                        <VideoPreview dataUrl={imageUrl} />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index, true)}
                                            className="absolute -top-2 -right-2 bg-danger-500 text-white rounded-full w-5 h-5"
                                        >
                                            <span className="material-symbols-rounded text-sm">close</span>
                                        </button>
                                    </div>
                                ))}

                                {newImageUrls.map((imageUrl, index) => (
                                    <div key={`new-${index}`} className="w-16 h-16 relative">
                                        <VideoPreview dataUrl={imageUrl} />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index, false)}
                                            className="absolute -top-2 -right-2 bg-danger-500 text-white rounded-full w-5 h-5"
                                        >
                                            <span className="material-symbols-rounded text-sm">close</span>
                                        </button>
                                    </div>
                                ))}
                                
                                <div
                                    className="w-16 h-16 bg-default-200 flex items-center justify-center rounded-lg border p-1 cursor-pointer"
                                    onClick={() => imagesFileInput.current?.click()}
                                >
                                    <span className="material-symbols-rounded">add</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-4">
                {showVariations && (
                    <>
                        <ProductVariations
                            onVariationsChange={handleVariationsChange}
                            initialVariations={product.variations}
                        />
                        <input
                            type="hidden"
                            name="variations"
                            value={JSON.stringify(variations)}
                            readOnly
                        />
                    </>
                )}
            </div>
        </form>
    );
};

export default EditProductForm;
