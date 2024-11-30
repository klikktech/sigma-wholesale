"use client";
import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    Input,
    Select,
    SelectItem,
    Checkbox,
} from "@nextui-org/react";
import { Variation } from "@/utils/types";

// First, define the props interface
interface ProductVariationsProps {
  onVariationsChange: (variations: any[]) => void;
}

// Then export the component with the props interface
const ProductVariations: React.FC<ProductVariationsProps> = ({ onVariationsChange }) => {
    const [variations, setVariations] = useState<Variation[]>([]);
    const [bulkPrice, setBulkPrice] = useState("");
    const [bulkSalePrice, setBulkSalePrice] = useState("");
    const [bulkStatus, setBulkStatus] = useState("");

    // New state for form inputs
    const [newVariation, setNewVariation] = useState<Variation>({
        id: "",
        variationName: "",
        price: "",
        salePrice: "",
        sku: "",
        stockStatus: "instock",
        displayStatus: "publish",
        stockQuantity: "",
    });

    // Add new state for tracking edit mode
    const [isEditing, setIsEditing] = useState(false);

    // Add new state for selected variations
    const [selectedVariations, setSelectedVariations] = useState<Set<string>>(new Set());

    // Call onVariationsChange whenever variations change
    React.useEffect(() => {
        onVariationsChange(variations);
    }, [variations, onVariationsChange]);

    // Update the updateVariations function
    const updateVariations = (newVariations: Variation[]) => {
        setVariations(newVariations);
        onVariationsChange(newVariations); // Immediately notify parent
    };

    const addVariation = () => {
        if (!newVariation.variationName) {
            alert("Variation name is required");
            return;
        }

        if (isEditing) {
            // Update existing variation
            const updatedVariations = variations.map(v => 
                v.id === newVariation.id ? newVariation : v
            );
            updateVariations(updatedVariations);
            setIsEditing(false);
        } else {
            // Add new variation
            const variationToAdd = {
                ...newVariation,
                id: Date.now().toString(),
            };
            updateVariations([...variations, variationToAdd]);
        }

        // Reset form
        setNewVariation({
            id: "",
            variationName: "",
            price: "",
            salePrice: "",
            sku: "",
            stockStatus: "instock",
            displayStatus: "publish",
            stockQuantity: "",
        });
    };

    const deleteVariation = (id: string) => {
        updateVariations(variations.filter((v) => v.id !== id));
    };

    const editVariation = (id: string, field: keyof Variation, value: string) => {
        updateVariations(
            variations.map((v) => (v.id === id ? { ...v, [field]: value } : v))
        );
    };

    // Add select all handler
    const handleSelectAll = (isSelected: boolean) => {
        if (isSelected) {
            setSelectedVariations(new Set(variations.map(v => v.id)));
        } else {
            setSelectedVariations(new Set());
        }
    };

    // Add individual select handler
    const handleSelectVariation = (id: string, isSelected: boolean) => {
        const newSelected = new Set(selectedVariations);
        if (isSelected) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        setSelectedVariations(newSelected);
    };

    // Modify bulk action handlers to only affect selected items
    const applyBulkPrice = () => {
        setVariations(variations.map((v) => 
            selectedVariations.has(v.id) ? { ...v, price: bulkPrice } : v
        ));
        setBulkPrice("");
    };

    const applyBulkSalePrice = () => {
        setVariations(variations.map((v) => 
            selectedVariations.has(v.id) ? { ...v, salePrice: bulkSalePrice } : v
        ));
        setBulkSalePrice("");
    };

    const applyBulkStatus = () => {
        setVariations(variations.map((v) => 
            selectedVariations.has(v.id) ? { ...v, status: bulkStatus } : v
        ));
        setBulkStatus("");
    };

    // Update the edit button click handler
    const handleEdit = (variation: Variation) => {
        setNewVariation({ ...variation });
        setIsEditing(true);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Variation Input Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-lg">
                <Input
                    label="Variation Name"
                    labelPlacement="outside"
                    placeholder="variationName"
                    value={newVariation.variationName}
                    onChange={(e) =>
                        setNewVariation({ ...newVariation, variationName: e.target.value })
                    }
                />
                <Input
                    label="Price"
                    labelPlacement="outside"
                    placeholder="Price"
                    value={newVariation.price}
                    onChange={(e) =>
                        setNewVariation({ ...newVariation, price: e.target.value })
                    }
                />
                <Input
                    label="Sale Price"
                    labelPlacement="outside"
                    placeholder="Sale Price"
                    value={newVariation.salePrice}
                    onChange={(e) =>
                        setNewVariation({ ...newVariation, salePrice: e.target.value })
                    }
                />
                <Input
                    label="SKU"
                    labelPlacement="outside"
                    placeholder="SKU"
                    value={newVariation.sku}
                    onChange={(e) =>
                        setNewVariation({ ...newVariation, sku: e.target.value })
                    }
                />
                <Input
                    label="Stock Quantity"
                    labelPlacement="outside"
                    placeholder="Stock Quantity"
                    value={newVariation.stockQuantity}
                    onChange={(e) =>
                        setNewVariation({ ...newVariation, stockQuantity: e.target.value })
                    }
                />
                <Select
                    label="Stock Status"
                    labelPlacement="outside"
                    placeholder="Select stock status"
                    value={newVariation.stockStatus}
                    onChange={(e) =>
                        setNewVariation({ ...newVariation, stockStatus: e.target.value })
                    }
                >
                    <SelectItem key="instock">In stock</SelectItem>
                    <SelectItem key="outofstock">Out of stock</SelectItem>
                </Select>
                <Select
                    label="Display Status"
                    labelPlacement="outside"
                    placeholder="Select display status"
                    value={newVariation.displayStatus}
                    onChange={(e) =>
                        setNewVariation({ ...newVariation, displayStatus: e.target.value })
                    }
                >
                    <SelectItem key="publish">Publish</SelectItem>
                    <SelectItem key="trash">Trash</SelectItem>
                </Select>
                <div className="flex items-end">
                    <Button color="primary" onClick={addVariation}>
                        {isEditing ? "Update Variation" : "Add Variation"}
                    </Button>
                </div>
            </div>

            {variations.length > 0 && (
                <>
                    {/* Bulk Actions */}
                    <div className="flex gap-2 justify-end">
                        <Input
                            placeholder="Bulk Price"
                            value={bulkPrice}
                            onChange={(e) => setBulkPrice(e.target.value)}
                            endContent={
                                <Button size="sm" onClick={applyBulkPrice}>
                                    Apply
                                </Button>
                            }
                        />
                        <Input
                            placeholder="Bulk Sale Price"
                            value={bulkSalePrice}
                            onChange={(e) => setBulkSalePrice(e.target.value)}
                            endContent={
                                <Button size="sm" onClick={applyBulkSalePrice}>
                                    Apply
                                </Button>
                            }
                        />
                        <Select
                            placeholder="Bulk Status"
                            value={bulkStatus}
                            onChange={(e) => setBulkStatus(e.target.value)}
                            endContent={
                                <Button size="sm" onClick={applyBulkStatus}>
                                    Apply
                                </Button>
                            }
                        >
                            <SelectItem key="instock">In stock</SelectItem>
                            <SelectItem key="outofstock">Out of stock</SelectItem>
                        </Select>
                    </div>

                    {/* Variations Table */}
                    <Table aria-label="Product Variations">
                        <TableHeader>
                            <TableColumn>
                                <Checkbox
                                    isSelected={selectedVariations.size === variations.length}
                                    isIndeterminate={selectedVariations.size > 0 && selectedVariations.size < variations.length}
                                    onValueChange={handleSelectAll}
                                />
                            </TableColumn>
                            <TableColumn>Name</TableColumn>
                            <TableColumn>Price</TableColumn>
                            <TableColumn>Sale Price</TableColumn>
                            <TableColumn>SKU</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {variations.map((variation) => (
                                <TableRow key={variation.id}>
                                    <TableCell>
                                        <Checkbox
                                            isSelected={selectedVariations.has(variation.id)}
                                            onValueChange={(isSelected) => 
                                                handleSelectVariation(variation.id, isSelected)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{variation.variationName}</TableCell>
                                    <TableCell>{variation.price}</TableCell>
                                    <TableCell>{variation.salePrice}</TableCell>
                                    <TableCell>{variation.sku}</TableCell>
                                    <TableCell>{variation.stockStatus}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                color="primary"
                                                variant="bordered"
                                                onClick={() => handleEdit(variation)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                color="danger"
                                                variant="bordered"
                                                onClick={() => deleteVariation(variation.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default ProductVariations; 