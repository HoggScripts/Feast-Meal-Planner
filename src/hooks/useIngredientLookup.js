import { searchIngredients } from "@/lib/ingredientApi";
import { useState } from "react";

const useIngredientLookup = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (query) => {
    setSearchLoading(true);
    setSearchError(null);

    try {
      console.log("Sending search request with query:", query);
      const results = await searchIngredients(query);
      console.log("Received search response:", results);
      setSearchResults(results);
    } catch (error) {
      console.error("Error during ingredient search:", error);
      setSearchError(error);
    } finally {
      setSearchLoading(false);
    }
  };

  return { searchResults, searchLoading, searchError, handleSearch };
};

export default useIngredientLookup;
