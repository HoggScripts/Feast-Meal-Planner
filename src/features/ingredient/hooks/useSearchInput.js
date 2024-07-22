import { useState, useEffect } from "react";

export const useSearchInput = (initialQuery, handleSearch) => {
  const [input, setInput] = useState(initialQuery || "");

  useEffect(() => {
    if (initialQuery.trim()) {
      handleSearch(initialQuery);
    }
  }, [initialQuery, handleSearch]);

  const handleSearchClick = () => {
    if (input.trim() === "") {
      console.log("Search input is empty");
      return;
    }
    handleSearch(input);
  };

  return {
    input,
    setInput,
    handleSearchClick,
  };
};
