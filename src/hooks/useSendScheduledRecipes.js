import { useMutation } from "@tanstack/react-query";
import { startOfWeek, addDays } from "date-fns";
import useMealPlanStore from "@/stores/useMealPlanStore";
import { scheduleRecipesOnGoogleCalendar } from "@/lib/googleCalendarApi";

const useSendScheduledRecipes = () => {
  const { scheduledRecipes } = useMealPlanStore();

  const mutation = useMutation({
    mutationFn: async () => {
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

      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      console.log("User TimeZone:", userTimeZone);

      const payload = {
        TimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ThisWeekRecipes: currentWeekRecipes.map((recipe) => ({
          RecipeName: recipe.recipe.recipeName,
          Date:
            typeof recipe.datetime === "string"
              ? recipe.datetime
              : new Date(recipe.datetime).toISOString(),
          MealType: recipe.mealType,
        })),
        NextWeekRecipes: nextWeekRecipes.map((recipe) => ({
          RecipeName: recipe.recipe.recipeName,
          Date:
            typeof recipe.datetime === "string"
              ? recipe.datetime
              : new Date(recipe.datetime).toISOString(),
          MealType: recipe.mealType,
        })),
      };

      console.log("Scheduled Recipes Payload:", payload);

      const response = await scheduleRecipesOnGoogleCalendar(payload);
      return response;
    },
  });

  return mutation;
};

export default useSendScheduledRecipes;
