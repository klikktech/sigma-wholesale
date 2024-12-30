'use client'

import Input from "@/components/atoms/Input";
import { SelectItem, Select, Spacer, Switch } from "@nextui-org/react";
import { useState } from "react";
import { addCategoryAction } from "./action";
import { useFormState, useFormStatus } from "react-dom";
import FormMessage from "@/components/molecules/FormMessage";
import FormSubmitButton from "@/components/molecules/FormSubmitButtton";

export const AddCategoryForm = ({categories}:{categories:any}) => {
    const [isSubcategory, setIsSubcategory] = useState(false);
    const [state, formAction] = useFormState(addCategoryAction, undefined);
    const { pending } = useFormStatus();

    return (
        <div className="w-1/3 xs:w-full mt-10">
            <form action={formAction}>
                <Input type="text" name="name" placeholder="Enter name" label="Name" labelPlacement="outside" required />
                <Spacer y={5} />
                <div className="w-full">
                    <Switch checked={isSubcategory} onChange={() => setIsSubcategory(!isSubcategory)}>
                        Sub Category
                    </Switch>
                    <input 
                        type="hidden" 
                        name="isSubcategory" 
                        value={isSubcategory.toString()} 
                    />
                </div>
                <Spacer y={5} />
                {isSubcategory &&
                    <Select
                        id="parentCategory"
                        name="parentCategory"
                        label="Parent Category"
                        labelPlacement="outside"
                        placeholder="Select Parent Category"
                    >
                        {categories?.map((category: any) => (
                            <SelectItem key={category.slug} value={category.slug}>{category.name}</SelectItem>
                        ))}
                    </Select>}
                <Spacer y={5} />
                {state?.error && <FormMessage message={state.error} />}
                <FormSubmitButton className="mb-10" disabled={pending} type="submit" color="primary" size="lg" buttonText="Add Category" pendingText="Adding category...">
                    Add Category
                </FormSubmitButton>
            </form>
        </div>
    )
}

export default AddCategoryForm;
