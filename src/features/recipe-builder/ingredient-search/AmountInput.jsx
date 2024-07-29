import React from "react";
import { Button, Input } from "@nextui-org/react";

function IngredientInput({ input, setInput, handleSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex space-x-2 w-full">
      <Input
        fullWidth
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
