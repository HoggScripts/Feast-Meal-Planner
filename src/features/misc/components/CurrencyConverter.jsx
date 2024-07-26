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
import useIngredientStore from "@/features/ingredient/hooks/useIngredientStore";
import TotalCostCard from "./TotalCostCard";

function CurrencyConverter() {
  const { setSelectedCurrency, convertCurrency, selectedCurrency } =
    useIngredientStore();

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
    <div>
      <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel> Currencies</SelectLabel>
            <SelectItem value="USD">US Dollar (USD)</SelectItem>
            <SelectItem value="EUR">Euro (EUR)</SelectItem>
            <SelectItem value="GBP">British Pound (GBP)</SelectItem>
            <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <TotalCostCard currency={selectedCurrency} />
    </div>
  );
}

export default CurrencyConverter;
