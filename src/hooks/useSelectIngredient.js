import { useState } from "react";
import axios from "axios";

export const useIngredientSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (query) => {
    setSearchLoading(true);
    setSearchError(null);

    try {
      console.log("Sending search request with query:", query);
      const response = await axios.get(
        `/api/ingredients/search?query=${query}`
      );
      console.log("Received search response:", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error during ingredient search:", error);
      setSearchError(error);
    } finally {
      setSearchLoading(false);
    }
  };

  return { searchResults, searchLoading, searchError, handleSearch };
};
