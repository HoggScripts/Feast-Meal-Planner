import IngredientCard from "./IngredientCard";

function IngredientResults({
  searchResults,
  searchLoading,
  searchError,
  onSelect,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {searchLoading && <div>Loading...</div>}
      {searchError && <div>Error: {searchError.message}</div>}
      {searchResults?.map((ingredient) => (
        <IngredientCard
          key={ingredient.id}
          ingredient={ingredient}
          onSelect={() => onSelect(ingredient)}
        />
      ))}
    </div>
  );
}

export default IngredientResults;
