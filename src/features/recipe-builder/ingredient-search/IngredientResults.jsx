import { ScrollShadow } from "@nextui-org/react";
import IngredientCard from "./IngredientCard";

function IngredientResults({
  searchResults,
  searchLoading,
  searchError,
  onSelect,
}) {
  return (
    <div className="flex flex-col items-center w-full">
      {searchLoading && <div>Loading...</div>}
      {searchError && <div>Error: {searchError.message}</div>}
      <ScrollShadow className="w-full h-64 overflow-y-auto border p-2">
        <div className="flex flex-col gap-4 p-2">
          {searchResults?.map((ingredient) => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              onSelect={() => onSelect(ingredient)}
            />
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}

export default IngredientResults;
