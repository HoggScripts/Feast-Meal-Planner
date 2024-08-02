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

function CurrencyConverter() {
  const { setSelectedCurrency, convertCurrency, selectedCurrency } =
    useRecipeStore((state) => ({
      setSelectedCurrency: state.setSelectedCurrency,
      convertCurrency: state.convertCurrency,
      selectedCurrency: state.selectedCurrency,
    }));

  useEffect(() => {
    const defaultCurrency = "USD";
    setSelectedCurrency(defaultCurrency);
    convertCurrency(defaultCurrency);
  }, [setSelectedCurrency, convertCurrency]);

  const handleCurrencyChange = async (value) => {
    setSelectedCurrency(value);
    await convertCurrency(value);
  };

  return (
    <div className="mt-4">
      <div className="mb-2">
        <TotalCostCard currency={selectedCurrency} />
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
