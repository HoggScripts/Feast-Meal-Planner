import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function IngredientInput({ input, setInput, handleSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div>
      <Input
        placeholder="Search for an ingredient"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}

export default IngredientInput;
