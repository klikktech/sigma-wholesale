'use client'
import { TABS_LIST } from "@/utils/constants";
import { Tabs as NextUITabs, Tab } from "@nextui-org/react";
import React from "react";
type Props = {
    elements: React.ReactNode[];
  };
const Tabs = ({ elements }: Props) => {
    return (
        <div className="flex justify-around my-3">
            <NextUITabs key="underlined" variant="underlined" aria-label="Tabs variants">
                {TABS_LIST.map((tab) => (
                    <Tab key={tab.key} title={tab.title}>
                        {elements.map((element, index) => (
                            <div key={index}>
                                {element}
                            </div>
                        ))}
                    </Tab>
                ))}
            </NextUITabs>
        </div>
    );
};

export default Tabs;
