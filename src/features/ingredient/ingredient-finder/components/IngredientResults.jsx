import IngredientCard from "./IngredientCard";
import styles from "../styles/IngredientResults.module.css";

function IngredientResults({
  searchResults,
  searchLoading,
  searchError,
  onSelect,
}) {
  return (
    <div className={styles.resultsSection}>
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
