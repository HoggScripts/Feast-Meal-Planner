import { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { VscTable } from "react-icons/vsc";
import { TbChartPieFilled } from "react-icons/tb";
import { FaRegChartBar } from "react-icons/fa";
import NutritionTable from "./NutritionTable";
import { Bars } from "./Bars";
import { Pies } from "./Pies";

export default function CardTabs() {
  const [selectedTab, setSelectedTab] = useState("table");

  const renderContent = () => {
    switch (selectedTab) {
      case "table":
        return <NutritionTable />;
      case "pie":
        return <Pies />;
      case "bar":
        return <Bars />;
      default:
        return <NutritionTable />;
    }
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key)}
      >
        <Tab
          key="table"
          title={
            <div className="flex items-center space-x-2">
              <VscTable />
              <span>Table</span>
            </div>
          }
        />
        <Tab
          key="pie"
          title={
            <div className="flex items-center space-x-2">
              <TbChartPieFilled />
              <span>Pie</span>
            </div>
          }
        />
        <Tab
          key="bar"
          title={
            <div className="flex items-center space-x-2">
              <FaRegChartBar />
              <span>Bar</span>
            </div>
          }
        />
      </Tabs>
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}
