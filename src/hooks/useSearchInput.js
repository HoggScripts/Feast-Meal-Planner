import { useState, useEffect } from "react";

export const useSearchInput = (initialQuery, handleSearch) => {
  const [input, setInput] = useState(initialQuery || "");

  useEffect(() => {
    if (typeof initialQuery === "string" && initialQuery.trim()) {
      handleSearch(initialQuery);
    }
  }, [initialQuery, handleSearch]);

  const handleSearchClick = () => {
    if (typeof input !== "string" || input.trim() === "") {
      console.log("Search input is empty or not a string");
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
