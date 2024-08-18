import { useState, useEffect } from "react";
import { Input, Button, Avatar, Badge } from "@nextui-org/react";
import { FaSearch, FaTimes } from "react-icons/fa";
import useIngredientLookup from "@/hooks/useIngredientLookup";
import IngredientCard from "./IngredientCard";
import useRecipeStore from "@/stores/useRecipeStore";

const IngredientSearch = () => {
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const { searchResults, searchError, handleSearch } = useIngredientLookup();

  const [errorMessage, setErrorMessage] = useState("");

  const { recipe, removeIngredient } = useRecipeStore((state) => ({
    recipe: state.recipe,
    removeIngredient: state.removeIngredient,
  }));

  const handleIngredientSearchChange = (e) => {
    setIngredientSearch(e.target.value);
    if (e.target.value === "") {
      setErrorMessage("Search field is empty");
    } else {
      setErrorMessage("");
    }
  };

  const handleIngredientSearchClick = async () => {
    if (ingredientSearch.trim() === "") {
      setErrorMessage("Search field cannot be empty.");
      return;
    }

    console.log("Search button clicked with query:", ingredientSearch);
    setErrorMessage("");
    await handleSearch(ingredientSearch);
    setIngredientSearch("");
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

  useEffect(() => {
    if (searchError) {
      setErrorMessage(searchError.message);
    }
  }, [searchError]);

  return (
    <>
      {recipe.ingredients.length > 0 && (
        <div className="flex gap-3 items-center mt-4 flex-wrap">
          {recipe.ingredients.map((ingredient) => (
            <Badge
              key={ingredient.id}
              content={
                <FaTimes
                  size={12}
                  onClick={() => removeIngredient(ingredient.id)}
                />
              }
              size="md"
              className="text-slate-300 bg-white border-slate-300"
            >
              <Avatar
                radius="md"
                src={ingredient.image || "NoPicture.webp"}
                className=""
              />
            </Badge>
          ))}
        </div>
      )}
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
          className="bg-white shadow-md text-black text-md flex items-center justify-center border-1 border-slate-600 hover:bg-slate-100"
        >
          <FaSearch className="mr-2" /> Search
        </Button>
      </div>

      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}

      {ingredients.length > 0 && (
        <div className="mt-4">
          {ingredients.map((ingredient) => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              selectedIngredient={selectedIngredient}
              setSelectedIngredient={setSelectedIngredient}
              setIngredients={setIngredients}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default IngredientSearch;
