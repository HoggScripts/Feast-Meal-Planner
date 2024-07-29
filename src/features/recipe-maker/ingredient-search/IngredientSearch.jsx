import { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import useIngredientLookup from "@/hooks/useIngredientLookup";
import IngredientCard from "./IngredientCard";

const IngredientSearch = () => {
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const { searchResults, searchError, handleSearch } = useIngredientLookup();

  const handleIngredientSearchChange = (e) => {
    setIngredientSearch(e.target.value);
  };

  const handleIngredientSearchClick = async () => {
    console.log("Search button clicked with query:", ingredientSearch);
    await handleSearch(ingredientSearch);
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      const mappedIngredients = searchResults.map((result) => ({
        id: result.id,
        name: result.name,
        image: result.image,
        amount: 0,
        unit: "",
        calories: null,
        fat: null,
        protein: null,
        carbohydrates: null,
        estimatedCost: null,
        possibleUnits: [],
      }));
      setIngredients(mappedIngredients);
      console.log("Mapped ingredients:", mappedIngredients);
    }
  }, [searchResults]);

  return (
    <>
      <div className="flex space-x-2 mt-4">
        <Input
          type="text"
          value={ingredientSearch}
          onChange={handleIngredientSearchChange}
          placeholder="Search for ingredients..."
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleIngredientSearchClick}
          className="bg-submission-blue text-white flex items-center justify-center"
        >
          <FaSearch className="mr-2" /> Search
        </Button>
      </div>
      {searchError && <div>Error: {searchError.message}</div>}
      {ingredients.length > 0 && (
        <div className="mt-4">
          {ingredients.map((ingredient) => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              selectedIngredient={selectedIngredient}
              setSelectedIngredient={setSelectedIngredient}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default IngredientSearch;
