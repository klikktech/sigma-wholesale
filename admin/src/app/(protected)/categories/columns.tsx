"use client";
import { User, Tooltip, Link, Chip } from "@nextui-org/react";
import { DeleteIcon } from "@/utils/icons";
import Modal from "@/components/molecules/Modal";
import React from "react";
import { ITableColumn } from "@/utils/types";
import { deleteCategory } from "./actions";

interface Category {
    id: string;
    categoryName: string;
    subCategories: any[];
    createdAt: string;
}

export const CATEGORY_COLUMNS: ITableColumn[] = [
    {
        key: "categoryName",
        label: "Category Name",
    },
    {
        key: "subCategories",
        label: "Sub Categories",
    },
    {
        key: "createdAt",
        label: "Created At",
    },
    {
        key: "actions",
        label: "Actions",
    },
];

export const renderCategoryTableCell = (category: Category, columnKey: React.Key) => {
    const cellValue = category[columnKey as keyof object];

    switch (columnKey) {
        case "categoryName":
            return (
                <User
                    avatarProps={{
                        radius: "full",
                        className: "",
                        showFallback: true,
                        fallback: (
                            <span className="material-symbols-rounded text-default-500">
                                category
                            </span>
                        ),
                    }}
                    name={<span className="capitalize">{category.categoryName}</span>}
                >
                </User>
            );
        case "subCategories":
            return <span>{category.subCategories.map((subCategory: any) => <Chip color="primary" variant="flat">{subCategory.subCategoryName}</Chip>)}</span>;
        case "createdAt":
            return <span>{new Date(cellValue).toLocaleDateString('en-US')}</span>;
        case "actions":
            return (
                <div className="relative flex items-center gap-4">
                    <Tooltip color="danger" content="Delete user">
                        <span className="cursor-pointer text-lg text-danger active:opacity-50">
                            <Modal
                                body={<>Are you sure you want to delete it</>}
                                onSuccess={async () => {
                                    await deleteCategory(category.categoryName);
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
