'use client'
import { TABS_LIST } from "@/utils/constants";
import { Tabs as NextUITabs, Tab } from "@nextui-org/react";
import React from "react";
import Button from "@/components/atoms/Button";
import Tabview from "../Tabview";

const Tabs = () => {
  return (
    <div className="my-3">
      <NextUITabs
        className="flex justify-evenly"
        key="underlined"
        variant="underlined"
        aria-label="Tabs variants"
        items={TABS_LIST}
      >
        {TABS_LIST.map((tab) => (
          <Tab key={tab.key} title={tab.title} className="flex gap-3">
            <div>{tab.key}</div>
            <Tabview category={tab.key}/>
          </Tab>
        ))}
      </NextUITabs>
      <div className="flex justify-center">
        <Button
          color="primary"
          className="mt-4 text-black py-2 rounded-lg hover:bg-primary-300"
        >
          view more
        </Button>
      </div>
    </div>
  );
};

export default Tabs;
