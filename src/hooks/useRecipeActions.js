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

export const useFetchRecipe = (id) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
    staleTime: 100,
    cacheTime: 1000,
  });
};

export const useCreateRecipe = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      toast.success("Recipe created successfully!");
      navigate(`/`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create recipe");
    },
  });

  return mutation;
};

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
