import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchIngredients } from "@/lib/ingredientApi";

export const useIngredientSearch = () => {
  const [query, setQuery] = useState("");
  const [trigger, setTrigger] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchIngredients", query],
    queryFn: () => searchIngredients(query),
    enabled: trigger,
    onSuccess: () => setTrigger(false),
  });

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      setQuery(searchQuery);
      setTrigger(true);
    } else {
      console.log("Search input is empty");
    }
  };

  return {
    query,
    setQuery,
    searchResults: data,
    searchLoading: isLoading,
    searchError: error,
    handleSearch,
  };
};
