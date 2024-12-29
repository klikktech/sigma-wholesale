'use client'
import { TABS_LIST } from "@/utils/constants";
import { Button, Tabs as NextUITabs, Spacer, Tab } from "@nextui-org/react";
import React from "react";
import Tabview from "../Tabview";
import { useRouter } from "next/navigation";

const Tabs = ({user}:{user:any}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState(TABS_LIST[0].key);

  return (
    <section className="w-full p-4 flex flex-col gap-4" id="tabs-section">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">OUR CATEGORIES</h2>
      </div>
      <NextUITabs
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key.toString())}
        className="flex flex-col sm:flex-row justify-evenly"
        key="underlined"
        color="primary"
        variant="underlined"
        aria-label="Tabs variants"
        items={TABS_LIST}
      >
        {TABS_LIST.map((tab) => (
          <Tab key={tab.key} title={tab.title} className="flex gap-3 font-semibold text-medium">
            <Tabview category={tab.key} user={user}/>
          </Tab>
        ))}
      </NextUITabs>
      <div className="text-center">
        <Button
          color="primary"
          className="px-6 py-2 text-black hover:bg-primary-600"
          onPress={() => router.push(`/categories/${selectedTab}/products?page=1&size=16`)}
        >
          View More
        </Button>
      </div>
    </section>
  );
};

export default Tabs;
