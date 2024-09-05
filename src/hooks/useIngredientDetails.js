import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIngredientDetails } from "@/lib/ingredientApi";

export const useIngredientDetails = () => {
  const [params, setParams] = useState({ id: null, amount: 100, unit: "g" });
  const queryClient = useQueryClient();
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getIngredientDetails", params.id, params.amount, params.unit],
    queryFn: () => getIngredientDetails(params.id, params.amount, params.unit),
    enabled: !!params.id,
    refetchOnWindowFocus: false,
    onSuccess: () => queryClient.invalidateQueries(["getIngredientDetails"]),
  });

  useEffect(() => {
    if (shouldRefetch && params.id) {
      console.log("Refetching with params:", params);
      refetch().then(() => {
        setShouldRefetch(false); 
      });
    }
  }, [shouldRefetch, params, refetch]);

  const fetchIngredientDetails = (newParams) => {
    if (!newParams.id) {
      console.log("Invalid ingredient id:", newParams.id);
      return;
    }
    console.log("Setting params for ingredient details:", newParams);
    setParams(newParams);
    setShouldRefetch(true); 
  };

  return {
    details: data, 
    detailsLoading: isLoading,
    detailsError: error,
    fetchIngredientDetails,
  };
};
