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
import { Variation } from "@/utils/types";
import { addProductAction } from "@/components/organisms/forms/products/AddProductForm/action";
import ProductVariations from "@/components/organisms/forms/products/AddProductForm/ProductVariations";



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
      alt="preview"
      height={200}
      width={200}
      className="rounded-lg w-full h-full object-cover"
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

const AddProductForm = ({ categories, brands }: { categories: any, brands: any }) => {
  const [state, formAction] = useFormState(addProductAction, undefined);
  const [variations, setVariations] = useState<Variation[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const displayImageFileInput = useRef<HTMLInputElement>(null);
  const imagesFileInput = useRef<HTMLInputElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [imagesDataUrl, setImagesDataUrl] = useState<string[]>([]);
  const [showVariations, setShowVariations] = useState(false);
  const [availableSubCategories, setAvailableSubCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleDisplayImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) generateDataUrlForDisplayImage(file, setDataUrl);
  };

  const handleImagesFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      generateDataUrlForImages(files, (newUrls) => {
        setImagesDataUrl(prevUrls => [...prevUrls, ...newUrls]);
      });
    }
  };

  const handleProductTypeChange = (value: string) => {
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

  const handleRemoveImage = (indexToRemove: number) => {
    setImagesDataUrl(prevUrls => prevUrls.filter((_, index) => index !== indexToRemove));
  };

  const handleCategoryChange = (values: string[]) => {
    setSelectedCategories(values);
    const subCategories = values.reduce((acc: any[], categoryName: string) => {
      const category = categories.find((cat: any) => cat.name === categoryName);
      return [...acc, ...(category?.childCategories || [])];
    }, []);
    setAvailableSubCategories(subCategories);
  };

  return (
    <form ref={formRef} action={formAction}>
      <div className="flex gap-4">
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Product Name
              </label>
              <Input type="text" id="name" name="name" required />
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
              <Input type="text" id="price" name="price" />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="salePrice">
                Sale Price
              </label>
              <Input type="text" id="salePrice" name="salePrice" />
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="sku">
                Sku
              </label>
              <Input type="text" id="sku" name="sku" required />
            </div>
            <div className="w-full">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="status"
              >
                Brand
              </label>
              <Select
                id="brand"
                name="brand"
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
                htmlFor="category"
              >
                Category
              </label>
              <Select
                id="category"
                name="category"
                required
                selectionMode="multiple"
                selectedKeys={selectedCategories}
                onSelectionChange={(keys) => handleCategoryChange(Array.from(keys) as string[])}
                className="flex-wrap line-clamp-1"
              >
                {categories?.map((category: any) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <input
              type="hidden"
              name="categories"
              value={JSON.stringify(selectedCategories)}
            />
            <div className="w-full">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="subCategory"
              >
                Sub Category
              </label>
              <Select
                id="subCategory"
                name="subCategory"
                isDisabled={!selectedCategories.length || availableSubCategories.length === 0}
              >
                {availableSubCategories.map((subCategory: any) => (
                  <SelectItem key={subCategory.name} value={subCategory.name}>
                    {subCategory.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
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
                defaultSelectedKeys={["instock"]}
                required
              >
                <SelectItem key="instock">In stock</SelectItem>
                <SelectItem key="outofstock">Out of stock</SelectItem>
              </Select>
            </div>
            <div className="w-full">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="status"
              >
                Product Type
              </label>
              <Select
                id="productType"
                name="productType"
                defaultSelectedKeys={["SIMPLE"]}
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
                defaultSelectedKeys={["publish"]}
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
              <Input type="text" id="stockQuantity" name="stockQuantity" />
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
              <Input type="text" id="boxQuantity" name="boxQuantity" />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="caseQuantity">
                Case Quantity
              </label>
              <Input type="text" id="caseQuantity" name="caseQuantity" />
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
              required
            />
          </div>
          <div className="w-full">
            <Switch defaultSelected id="isOnSale" name="isOnSale">
              Add to Deals
            </Switch>
            <input type="hidden" name="isOnSale" value={formRef.current?.isOnSale} />
          </div>

          <div className="flex gap-2 w-full">
            <div className="w-full">
              <FormSubmitButton
                pendingText="Adding new product"
                buttonText="Add Product"
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
            accept="image/*,video/*" />
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
                {imagesDataUrl.length > 0 ? (
                  imagesDataUrl.map((imageUrl, index) => (
                    <div
                      key={`image-${index}`}
                      className="w-16 h-16 relative flex items-center justify-center space-x-4 rounded-lg border p-1"
                    >
                      <VideoPreview dataUrl={imageUrl} />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-danger-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-danger-600"
                      >
                        <span className="material-symbols-rounded text-sm">close</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="h-16 text-default-500 flex items-center">
                    Add more product images
                  </div>
                )}
                <div
                  className="w-16 h-16 bg-default-200 flex items-center justify-center space-x-4 rounded-lg border p-1 cursor-pointer"
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

export default AddProductForm;
