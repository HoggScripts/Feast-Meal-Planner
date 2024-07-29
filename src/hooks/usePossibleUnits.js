import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPossibleUnits } from "@/lib/ingredientApi";

export const usePossibleUnits = () => {
  const [id, setId] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getPossibleUnits", id],
    queryFn: () => getPossibleUnits(id),
    enabled: trigger,
    onSuccess: () => setTrigger(false),
  });

  const fetchPossibleUnits = (ingredientId) => {
    setId(ingredientId);
    setTrigger(true);
  };

  return {
    fetchPossibleUnits,
    possibleUnits: data,
    possibleUnitsLoading: isLoading,
    possibleUnitsError: error,
  };
};
