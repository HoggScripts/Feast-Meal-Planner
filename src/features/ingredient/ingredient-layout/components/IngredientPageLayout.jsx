import IngredientSearch from "../../ingredient-finder/components/IngredientSearch";
import IngredientTable from "../../ingredient-table/components/IngredientTable";
import TabbedCharts from "../../ingredient-charts/components/TabbedCharts";
import RecipeInstructionsForm from "@/features/recipe/recipe-instructions/components/RecipeInstructionsForm";

import CurrencyConverter from "@/features/misc/components/CurrencyConverter";
import CookingTimeInput from "@/features/misc/components/CookingTimeInput";
import TotalCostCard from "@/features/misc/components/TotalCostCard";
import RecipeTagManager from "@/features/recipe/recipe-instructions/components/RecipeTagManager";

const IngredientPageLayout = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
      <div className="col-span-1 md:col-span-2">
        <IngredientSearch />
      </div>
      <div className="col-span-1 md:col-span-2">
        <IngredientTable />
      </div>
      <div className="col-span-1">
        <TabbedCharts />
      </div>
      <div className="col-span-1">
        <RecipeInstructionsForm />
      </div>
      <div className="col-span-1">
        <CurrencyConverter />
        <CookingTimeInput />
        <RecipeTagManager />
      </div>
    </div>
  );
};

export default IngredientPageLayout;
