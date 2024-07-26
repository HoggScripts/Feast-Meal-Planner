import React from "react";
import { Spacer } from "@nextui-org/react";
import IngredientInput from "./IngredientInput";
import IngredientCard from "./IngredientCard";
import { useIngredientSearch } from "../../hooks/useIngredientSearch";
import { useSearchInput } from "../../hooks/useSearchInput";
import { useSelectIngredient } from "../../hooks/useSelectIngredient";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";

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
        {searchResults?.map((ingredient, index) => (
          <React.Fragment key={ingredient.id}>
            <IngredientCard
              ingredient={ingredient}
              onSelect={() => handleSelect(ingredient)}
            />
            {index < searchResults.length - 1 && <Spacer x={4} />}
          </React.Fragment>
        ))}
        <Separator className="my-2" />
      </div>
    </div>
  );
}

export default IngredientSearch;
