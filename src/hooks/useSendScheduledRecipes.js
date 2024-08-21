import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { startOfWeek, addDays } from "date-fns";
import useMealPlanStore from "@/stores/useMealPlanStore";

const useSendScheduledRecipes = () => {
  const { scheduledRecipes } = useMealPlanStore();

  const mutation = useMutation(async () => {
    const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const nextWeekStart = addDays(currentWeekStart, 7);

    const currentWeekRecipes = scheduledRecipes.filter(({ datetime }) => {
      const recipeDate = new Date(datetime);
      return (
        recipeDate >= currentWeekStart &&
        recipeDate < addDays(currentWeekStart, 7)
      );
    });

    const nextWeekRecipes = scheduledRecipes.filter(({ datetime }) => {
      const recipeDate = new Date(datetime);
      return (
        recipeDate >= nextWeekStart && recipeDate < addDays(nextWeekStart, 7)
      );
    });

    const payload = {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Get user's timezone
      currentWeekRecipes: currentWeekRecipes.map((recipe) => ({
        recipeName: recipe.recipe.name,
        date: recipe.datetime.toISOString(),
        mealTime: recipe.mealType,
      })),
      nextWeekRecipes: nextWeekRecipes.map((recipe) => ({
        recipeName: recipe.recipe.name,
        date: recipe.datetime.toISOString(),
        mealTime: recipe.mealType,
      })),
    };

    const response = await axios.post("/api/scheduled-recipes", payload);
    return response.data;
  });

  return mutation;
};

export default useSendScheduledRecipes;
