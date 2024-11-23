"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Select, SelectItem, Switch } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";
import FormMessage from "@/components/molecules/FormMessage";
import Link from "next/link";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes";
import { editProductAction } from "./actions";
import Image from "next/image";
import FormSubmitButton from "@/components/molecules/FormSubmitButtton";
import { ProductDetails } from "@/utils/types";
import Video from "@/components/atoms/Video";

interface Props {
  product: ProductDetails;
}

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

const EditProductForm = ({ product }: Props) => {
  const [state, formAction] = useFormState(editProductAction, undefined);

  const displayImageFileInput = useRef<HTMLInputElement>(null);
  const imagesFileInput = useRef<HTMLInputElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(
    product.displayImage?.imageUrl || null
  );
  const [imagesDataUrl, setImagesDataUrl] = useState<string[] | null>(
    product.images || null
  );

  const handleDisplayImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) generateDataUrlForDisplayImage(file, setDataUrl);
  };

  const handleImagesFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      generateDataUrlForImages(files, setImagesDataUrl);
    }
  };

  return (
    <form action={formAction}>
      <div className="flex gap-4">
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Product Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                defaultValue={product.name}
                required
              />
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-full">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="maxPrice"
              >
                Max price
              </label>
              <Input
                type="text"
                id="maxPrice"
                defaultValue={product.maxPrice?.toString() || ""}
                name="maxPrice"
              />
            </div>
            <div className="w-full">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="minPrice"
              >
                Min Price
              </label>
              <Input
                type="text"
                id="minPrice"
                name="minPrice"
                defaultValue={product.minPrice?.toString() || ""}
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="sku">
                Sku
              </label>
              <Input
                type="text"
                id="sku"
                name="sku"
                defaultValue={product.sku}
                required
              />
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
                defaultSelectedKeys={[product.status]}
                required
              >
                <SelectItem key="instock">In stock</SelectItem>
                <SelectItem key="outofstock">Out of stock</SelectItem>
              </Select>
            </div>
            {/* <div className="w-full">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="status"
              >
                Comment Status
              </label>
              <Select
                id="commentStatus"
                name="commentStatus"
                defaultSelectedKeys={[product.commentStatus]}
                required
              >
                <SelectItem key="open">Open</SelectItem>
                <SelectItem key="closed">Closed</SelectItem>
              </Select>
            </div> */}
                        <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="details">
                Details
              </label>
              <Input
                type="text"
                id="details"
                name="details"
                defaultValue={product.details}
                required
              />
            </div>
          </div>
          <div className="w-full">
            <div className="w-full">
              <Switch
                defaultSelected={product.isOnSale}
                name="isOnSale"
                id="isOnSale"
              >
                Is on sale
              </Switch>
            </div>
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
                {imagesDataUrl?.length ? (
                  imagesDataUrl?.map((imageUrl, index) => (
                    <div
                      key={`image-${index}`}
                      className="w-16 h-16 flex items-center justify-center space-x-4 rounded-lg border p-1"
                    >
                      {/* Render video and image based on requirement here */}
                      <VideoPreview dataUrl={imageUrl} />
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
    </form>
  );
};

export default EditProductForm;
