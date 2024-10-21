'use client'
import { TABS_LIST } from "@/utils/constants";
import { Tabs as NextUITabs, Tab } from "@nextui-org/react";
import React from "react";
import ProductsCarousel from "../ProductsCarousel";
import Button from "@/components/atoms/Button";
import Tabview from "../Tabview";
type Props = {
    elements: React.ReactNode[];
};
const Tabs = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="my-3">
            <NextUITabs className="flex justify-evenly" key="underlined" variant="underlined" aria-label="Tabs variants">
                test in tab
                {TABS_LIST.map((tab) => (
                    <Tab key={tab.key} title={tab.title} className="flex gap-3">
                        {children}
                    </Tab>
                ))}
            </NextUITabs>
            <div className="flex justify-center">
                <Button color="primary" className="mt-4 text-black py-2 rounded-lg hover:bg-primary-300">
                    view more
                </Button>
            </div>
        </div>
    );
};

export default Tabs;
