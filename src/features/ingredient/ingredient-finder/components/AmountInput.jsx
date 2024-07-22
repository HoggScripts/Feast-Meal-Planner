import { Input } from "@/components/ui/input";
import useIngredientStore from "../../hooks/useIngredientStore";

function AmountInput() {
  const { currentIngredient, updateCurrentIngredient } = useIngredientStore();

  const handleAmountChange = (e) => {
    updateCurrentIngredient({ amount: e.target.value });
  };

  return (
    <Input
      type="number"
      value={currentIngredient.amount || ""}
      onChange={handleAmountChange}
      placeholder="Enter amount"
      className="mb-2"
    />
  );
}

export default AmountInput;
