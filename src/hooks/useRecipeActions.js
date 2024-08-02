import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from "@/lib/recipeApi";

export const useFetchRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
    staleTime: 100,
    cacheTime: 1000,
  });
};

// Hook to fetch a single recipe by id
export const useFetchRecipe = (id) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
    staleTime: 100,
    cacheTime: 1000,
  });
};

// Hook to create a recipe
export const useCreateRecipe = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: (data) => {
      toast.success("Recipe created successfully!");
      navigate(`/recipes/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create recipe");
    },
  });

  return mutation;
};

// Hook to update a recipe
export const useUpdateRecipe = () => {
  const mutation = useMutation({
    mutationFn: updateRecipe,
    onSuccess: (data) => {
      toast.success("Recipe updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update recipe");
    },
  });

  return mutation;
};

// Hook to delete a recipe
export const useDeleteRecipe = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      toast.success("Recipe deleted successfully!");
      navigate("/recipes");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete recipe");
    },
  });

  return mutation;
};
