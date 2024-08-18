import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRecipeStore from "@/stores/useRecipeStore";

function CurrencyConverter({ recipe }) {
  const [convertedCost, setConvertedCost] = useState(0);
  const { setSelectedCurrency, selectedCurrency, originalCosts } =
    useRecipeStore((state) => ({
      setSelectedCurrency: state.setSelectedCurrency,
      selectedCurrency: state.selectedCurrency,
      originalCosts: state.originalCosts,
    }));

  useEffect(() => {
    const defaultCurrency = "USD";
    setSelectedCurrency(defaultCurrency);
    calculateTotalCost(defaultCurrency, recipe); // Calculate the initial cost
  }, [setSelectedCurrency, recipe]);

  const calculateTotalCost = async (currency, recipe) => {
    if (!recipe || !recipe.ingredients) return;

    const costPromises = recipe.ingredients.map(async (ingredient) => {
      const originalCost =
        originalCosts[ingredient.id] || ingredient.estimatedCost;
      if (currency === "USD") {
        return originalCost;
      } else {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${originalCost}&from=USD&to=${currency}`
        );
        const data = await res.json();
        return data.rates[currency];
      }
    });

    const costs = await Promise.all(costPromises);
    const totalCost = costs.reduce((acc, cost) => acc + cost, 0);

    setConvertedCost(totalCost.toFixed(2));
  };

  const handleCurrencyChange = async (value) => {
    setSelectedCurrency(value);
    await calculateTotalCost(value, recipe); // Calculate cost on currency change
  };

  const currencySymbols = {
    USD: "$",
    CAD: "$",
    EUR: "€",
    GBP: "£",
  };

  return (
    <div className="mt-4">
      <div className="mb-2">
        <div className="flex justify-between items-center bg-slate-300 p-2 rounded-lg">
          <p className="text-sm font-medium">Total Cost</p>
          <p className="text-2xl font-bold">
            {currencySymbols[selectedCurrency] || "$"}
            {convertedCost}
          </p>
        </div>
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
