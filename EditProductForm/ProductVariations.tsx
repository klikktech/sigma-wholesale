import React, { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { Select, SelectItem } from "@nextui-org/react";
import { Variation } from "@/utils/types";

interface ProductVariationsProps {
  initialVariations?: Variation[];
  onChange?: (variations: Variation[]) => void;
}

const ProductVariations: React.FC<ProductVariationsProps> = ({ 
  initialVariations = [],
  onChange 
}) => {
  const [variations, setVariations] = useState<Variation[]>(initialVariations);
  const [newVariation, setNewVariation] = useState<Variation>({
    id: crypto.randomUUID(),
    name: "",
    price: "",
    sku: "",
    stockStatus: "instock",
    salePrice: "",
    displayStatus: "draft",
    stockQuantity: "0",
    isSelected: false
  });

  useEffect(() => {
    onChange?.(variations);
  }, [variations, onChange]);

  const handleAddVariation = () => {
    if (!newVariation.name || !newVariation.price || !newVariation.sku) {
      return; // Basic validation
    }
    setVariations([...variations, newVariation]);
    setNewVariation({
      id: crypto.randomUUID(),
      name: "",
      price: "",
      sku: "",
      stockStatus: "instock",
      salePrice: "",
      displayStatus: "draft",
      stockQuantity: "0",
      isSelected: false
    });
  };

  const handleDeleteVariation = (id: string) => {
    setVariations(variations.filter(v => v.id !== id));
  };

  const handleUpdateVariation = (id: string, field: keyof Variation, value: string) => {
    setVariations(variations.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">Product Variations</h3>
      <input 
        type="hidden" 
        name="variations" 
        value={JSON.stringify(variations)} 
      />
      
      <div className="grid grid-cols-5 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Name"
          value={newVariation.name}
          onChange={(e) => setNewVariation({ ...newVariation, name: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Price"
          value={newVariation.price}
          onChange={(e) => setNewVariation({ ...newVariation, price: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Sale Price"
          value={newVariation.salePrice}
          onChange={(e) => setNewVariation({ ...newVariation, salePrice: e.target.value })}
        />
        <Input
          type="text"
          placeholder="SKU"
          value={newVariation.sku}
          onChange={(e) => setNewVariation({ ...newVariation, sku: e.target.value })}
        />
        <Button 
          onClick={handleAddVariation}
          className="h-[40px]"
        >
          Add Variation
        </Button>
      </div>

      <div className="space-y-2">
        {variations.map((variation) => (
          <div key={variation.id} className="grid grid-cols-6 gap-4 p-4 border rounded">
            <Input
              type="text"
              value={variation.name}
              onChange={(e) => handleUpdateVariation(variation.id, 'name', e.target.value)}
            />
            <Input
              type="number"
              value={variation.price}
              onChange={(e) => handleUpdateVariation(variation.id, 'price', e.target.value)}
            />
            <Input
              type="number"
              value={variation.salePrice}
              onChange={(e) => handleUpdateVariation(variation.id, 'salePrice', e.target.value)}
            />
            <Input
              type="text"
              value={variation.sku}
              onChange={(e) => handleUpdateVariation(variation.id, 'sku', e.target.value)}
            />
            <Select 
              value={variation.stockStatus}
              onChange={(e) => handleUpdateVariation(variation.id, 'stockStatus', e.target.value)}
            >
              <SelectItem key="instock">In Stock</SelectItem>
              <SelectItem key="outofstock">Out of Stock</SelectItem>
            </Select>
            <Button 
              color="danger" 
              onClick={() => handleDeleteVariation(variation.id)}
              className="h-[40px]"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariations;