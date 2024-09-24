'use client'
import { TABS_LIST } from "@/utils/constants";
import { Tabs as NextUITabs, Tab } from "@nextui-org/react";
import React from "react";

const Tabs = () => {
    return <div className="flex justify-around my-3">
            <NextUITabs key="underlined" variant="underlined" aria-label="Tabs variants">
                {TABS_LIST.map((item) => (
                    <Tab key={item.key} title={item.title} />
                ))}
            </NextUITabs>
    </div>
};

export default Tabs;
