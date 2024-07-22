import { useIngredientSearch } from "../../hooks/useIngredientSearch";
import IngredientInput from "./IngredientInput";
import IngredientCard from "./IngredientCard";
import { useSearchInput } from "../../hooks/useSearchInput";
import { useSelectIngredient } from "../../hooks/useSelectIngredient";
import styles from "../styles/IngredientSearch.module.css";

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
    <div className={styles.container}>
      <div className={styles.inputSection}>
        <IngredientInput
          input={input}
          setInput={setInput}
          handleSearch={handleSearchClick}
        />
      </div>
      {searchLoading && <div>Loading...</div>}
      {searchError && <div>Error: {searchError.message}</div>}
      <div className={styles.resultsSection}>
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
