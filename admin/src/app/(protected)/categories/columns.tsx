"use client";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "@/utils/icons";
import Modal from "@/components/molecules/Modal";
import React from "react";
import { ITableColumn } from "@/utils/types";
import { deleteCategory } from "./actions";

interface Category {
    id: string;
    name: string;
    childCategories: any[];
    slug: string;
}

export const CATEGORY_COLUMNS: ITableColumn[] = [
    {
        key: "name",
        label: "CATEGORY NAME",
    },
    {
        key: "subCategories",
        label: "SUB CATEGORIES",
    },
    {
        key: "actions",
        label: "ACTIONS",
    },
];

export const renderCategoryTableCell = (category: Category, columnKey: React.Key) => {
    const cellValue = category[columnKey as keyof object];

    switch (columnKey) {
        case "name":
            return (
                <User
                    avatarProps={{
                        radius: "full",
                        className: "bg-default-100",
                        showFallback: true,
                        fallback: (
                            <span className="material-symbols-rounded text-default-500">
                                category
                            </span>
                        ),
                    }}
                    name={<span className="font-medium text-default-800">{category.name}</span>}
                >
                </User>
            );
        case "subCategories":
            return (
                <div className="flex flex-wrap gap-2">
                    {category.childCategories.length > 0 ? category.childCategories.map((subCategory: any) => (
                        <Chip 
                            key={subCategory.slug} 
                            className="capitalize text-sm" 
                            color="primary" 
                            variant="flat"
                            size="sm"
                        >
                            {subCategory.name}
                        </Chip>
                    )) : <Chip className="capitalize text-sm" color="default" variant="flat" size="sm">No subcategories</Chip>}
                </div>
            );
        case "actions":
            return (
                <div className="relative flex items-center">
                    <Tooltip color="danger" content="Delete category">
                        <span className="cursor-pointer text-lg text-danger-500 hover:text-danger-600 transition-colors">
                            <Modal
                                body={
                                    <div className="py-4">
                                        <p className="text-default-900">Are you sure you want to delete this category?</p>
                                        <p className="text-default-500 text-sm mt-1">This action cannot be undone.</p>
                                    </div>
                                }
                                onSuccess={async () => {
                                    await deleteCategory(category.slug);
                                }}
                                successButton="Delete"
                            >
                                <DeleteIcon />
                            </Modal>
                        </span>
                    </Tooltip>
                </div>
            );
        default:
            return (cellValue as string).includes("null") ? <>-</> : cellValue;
    }
};
