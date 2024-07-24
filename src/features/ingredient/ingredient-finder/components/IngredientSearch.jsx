import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIngredientSearch } from "../../hooks/useIngredientSearch";
import IngredientInput from "./IngredientInput";
import IngredientCard from "./IngredientCard";
import { useSearchInput } from "../../hooks/useSearchInput";
import { useSelectIngredient } from "../../hooks/useSelectIngredient";

function IngredientSearch() {
  const {
    query,
    setQuery,
    searchResults,
    searchLoading,
    searchError,
    handleSearch,
  } = useIngredientSearch();

  const { input, setInput, handleSearchClick } = useSearchInput(
    query,
    (searchQuery) => {
      setQuery(searchQuery);
      handleSearch(searchQuery);
    }
  );

  const { handleSelect } = useSelectIngredient();

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <IngredientInput
          input={input}
          setInput={setInput}
          handleSearch={handleSearchClick}
        />
      </div>
      {searchLoading && <div>Loading...</div>}
      {searchError && <div>Error: {searchError.message}</div>}
      <div className="flex flex-wrap justify-center gap-4">
        {searchResults?.map((ingredient) => (
          <IngredientCard
            key={ingredient.id}
            ingredient={ingredient}
            onSelect={() => handleSelect(ingredient)}
          />
        ))}
      </div>
    </div>
  );
}

export default IngredientSearch;
