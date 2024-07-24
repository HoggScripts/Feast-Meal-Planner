import IngredientSearch from "../../ingredient-finder/components/IngredientSearch";
import IngredientTable from "../../ingredient-table/components/IngredientTable";
import TabbedCharts from "../../ingredient-charts/components/TabbedCharts";
import RecipeInstructionsForm from "@/features/recipe/recipe-instructions/components/RecipeInstructionsForm";
import TotalCostCard from "../../ingredient-charts/components/TotalCostCard";

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
        <TotalCostCard />
      </div>
    </div>
  );
};

export default IngredientPageLayout;
