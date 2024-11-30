"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Select, SelectItem, Switch, Textarea } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";
import FormMessage from "@/components/molecules/FormMessage";
import Link from "next/link";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes";
import { editProductAction } from "./actions";
import Image from "next/image";
import FormSubmitButton from "@/components/molecules/FormSubmitButtton";
import { ProductDetails, Variation } from "@/utils/types";
import ProductVariations from "./ProductVariations";

interface EditProductFormProps {
  product: ProductDetails;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
  const [state, formAction] = useFormState(editProductAction, undefined);
  const displayImageFileInput = useRef<HTMLInputElement>(null);
  const imagesFileInput = useRef<HTMLInputElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(product.displayImage || null);
  const [imagesDataUrl, setImagesDataUrl] = useState<string[] | null>(product.images || null);
  const [showVariations, setShowVariations] = useState(product.productType === "variation");

  const handleDisplayImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setDataUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImagesFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const readers = Array.from(files).map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(setImagesDataUrl);
    }
  };

  const handleProductTypeChange = (value: string) => {
    setShowVariations(value === "variation");
  };

  return (
    <form action={formAction}>
      <input type="hidden" name="productId" value={product.id} />
      <div className="flex gap-4">
        <div className="flex flex-col w-full gap-4">
          {/* Basic Information */}
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

          {/* Price and SKU */}
          <div className="w-full flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="price">
                Price
              </label>
              <Input 
                type="number" 
                id="price" 
                name="price" 
                defaultValue={product.price?.toString() || ""}
                required 
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="sku">
                SKU
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

          {/* Brand and Category */}
          <div className="w-full flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="brand">
                Brand
              </label>
              <Select
                id="brand"
                name="brand"
                defaultSelectedKeys={[product.brand]}
                required
              >
                <SelectItem key="brand1">Brand 1</SelectItem>
                <SelectItem key="brand2">Brand 2</SelectItem>
              </Select>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="category">
                Category
              </label>
              <Select
                id="category"
                name="category"
                defaultSelectedKeys={[product.category]}
                required
              >
                <SelectItem key="category1">Category 1</SelectItem>
                <SelectItem key="category2">Category 2</SelectItem>
              </Select>
            </div>
          </div>

          {/* Status and Product Type */}
          <div className="w-full flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="status">
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
              <label className="block text-sm font-medium mb-1" htmlFor="productType">
                Product Type
              </label>
              <Select
                id="productType"
                name="productType"
                defaultSelectedKeys={[product.productType]}
                onChange={(e) => handleProductTypeChange(e.target.value)}
                required
              >
                <SelectItem key="simple">Simple</SelectItem>
                <SelectItem key="variation">Variation</SelectItem>
              </Select>
            </div>
          </div>

          {/* Quantities */}
          <div className="w-full flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="boxQuantity">
                Box Quantity
              </label>
              <Input 
                type="number" 
                id="boxQuantity" 
                name="boxQuantity" 
                defaultValue={product.boxQuantity?.toString() || ''}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="caseQuantity">
                Case Quantity
              </label>
              <Input 
                type="number" 
                id="caseQuantity" 
                name="caseQuantity" 
                defaultValue={product.caseQuantity?.toString() || ''}
              />
            </div>
          </div>

          {/* Description */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product.description}
              rows={4}
              required
            />
          </div>

          {/* Is On Sale Switch */}
          <div className="w-full">
            <Switch 
              defaultSelected={product.isOnSale} 
              name="isOnSale" 
              id="isOnSale"
            >
              Add to Deals
            </Switch>
          </div>

          {/* Form Actions */}
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

        {/* Image Upload Section */}
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
          {/* Image preview and upload UI */}
          {/* ... Your existing image upload UI code ... */}
        </div>
      </div>

      {/* Variations Section */}
      {showVariations && (
        <div className="mt-4">
          <ProductVariations initialVariations={product.variations} />
        </div>
      )}
    </form>
  );
};

export default EditProductForm;
