import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRecipeStore from "@/hooks/useRecipeStore";
import TotalCostCard from "./TotalCostCard";

function CurrencyConverter({ recipe: propRecipe }) {
  const {
    setSelectedCurrency,
    convertCurrency,
    selectedCurrency,
    recipe: stateRecipe,
  } = useRecipeStore((state) => ({
    setSelectedCurrency: state.setSelectedCurrency,
    convertCurrency: state.convertCurrency,
    selectedCurrency: state.selectedCurrency,
    recipe: state.recipe,
  }));

  const recipe = propRecipe || stateRecipe; // Use propRecipe if passed, otherwise fall back to stateRecipe

  useEffect(() => {
    const defaultCurrency = "USD";
    setSelectedCurrency(defaultCurrency);
    convertCurrency(defaultCurrency, recipe); // Include recipe for conversion
  }, [setSelectedCurrency, convertCurrency, recipe]);

  const handleCurrencyChange = async (value) => {
    setSelectedCurrency(value);
    await convertCurrency(value, recipe); // Pass the recipe for conversion
  };

  return (
    <div className="mt-4">
      <div className="mb-2">
        <TotalCostCard recipe={recipe} currency={selectedCurrency} />
      </div>
      <div>
        <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currencies</SelectLabel>
              <SelectItem value="USD">US Dollar (USD)</SelectItem>
              <SelectItem value="EUR">Euro (EUR)</SelectItem>
              <SelectItem value="GBP">British Pound (GBP)</SelectItem>
              <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default CurrencyConverter;
