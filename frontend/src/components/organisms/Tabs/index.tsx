'use client'
import { TABS_LIST } from "@/utils/constants";
import { Button, Tabs as NextUITabs, Tab } from "@nextui-org/react";
import React from "react";
import Tabview from "../Tabview";
import { useRouter } from "next/navigation";

const Tabs = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState(TABS_LIST[0].key);

  return (
    <div className="my-3" id="tabs-section">
            <h1 className="my-2 text-xl">OUR CATEGORIES</h1>

      <NextUITabs
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key.toString())}
        className="flex flex-col sm:flex-row justify-evenly"
        key="underlined"
        variant="underlined"
        aria-label="Tabs variants"
        items={TABS_LIST}
      >
        {TABS_LIST.map((tab) => (
          <Tab key={tab.key} title={tab.title} className="flex gap-3">
            <Tabview category={tab.key}/>
          </Tab>
        ))}
      </NextUITabs>
      <div className="flex justify-center">
        <Button
          color="primary"
          className="mt-4 text-black py-2 rounded-lg hover:bg-primary-300"
          onClick={() => router.push(`/categories/${selectedTab}/products?page=1&size=16`)}
        >
          View More
        </Button>
      </div>
    </div>
  );
};

export default Tabs;
