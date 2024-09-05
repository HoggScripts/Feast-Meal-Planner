import { addDays, startOfWeek } from "date-fns";
import { persist } from "zustand/middleware";
import { create } from "zustand";

// Shuffle Algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const useMealPlanStore = create(
  persist(
    (set, get) => ({
      scheduledRecipes: [],
      shoppingList: [],

      addRecipeToSchedule: (recipe, mealType, datetime) => {
        set((state) => {
          const isNextWeek =
            new Date(datetime) >= addDays(startOfWeek(new Date()), 7);
          const week = isNextWeek ? "nextWeek" : "currentWeek";

          const newScheduledRecipes = [
            ...state.scheduledRecipes,
            { recipe, mealType, datetime },
          ];

          const currentShoppingList = Array.isArray(state.shoppingList)
            ? state.shoppingList
            : [];

          // Add ingredients to the shopping list considering the week
          const newShoppingList = [
            ...currentShoppingList,
            ...recipe.ingredients
              .filter(
                (ingredient) =>
                  !currentShoppingList.some(
                    (item) => item.id === ingredient.id && item.week === week
                  )
              )
              .map((ingredient) => ({
                ...ingredient,
                week,
              })),
          ];

          return {
            scheduledRecipes: newScheduledRecipes,
            shoppingList: newShoppingList,
          };
        });
      },

      removeRecipeFromSchedule: (recipeId, mealType, datetime) => {
        set((state) => {
          const isNextWeek =
            new Date(datetime) >= addDays(startOfWeek(new Date()), 7);
          const week = isNextWeek ? "nextWeek" : "currentWeek";

          const newScheduledRecipes = state.scheduledRecipes.filter(
            (item) =>
              item.recipe.id !== recipeId ||
              item.mealType !== mealType ||
              new Date(item.datetime).getTime() !== new Date(datetime).getTime()
          );

          const updatedShoppingList = state.shoppingList.filter((ingredient) =>
            newScheduledRecipes.some((item) =>
              item.recipe.ingredients.some((i) => i.id === ingredient.id)
            )
          );

          return {
            scheduledRecipes: newScheduledRecipes,
            shoppingList: updatedShoppingList,
          };
        });
      },

      clearSchedule: () => {
        set({
          scheduledRecipes: [],
          shoppingList: [],
        });
      },

      randomlyFillSchedule: (allRecipes) => {
        const breakfastRecipes = shuffleArray(
          allRecipes.filter((recipe) => recipe.mealType === "Breakfast")
        );
        const lunchRecipes = shuffleArray(
          allRecipes.filter((recipe) => recipe.mealType === "Lunch")
        );
        const dinnerRecipes = shuffleArray(
          allRecipes.filter((recipe) => recipe.mealType === "Dinner")
        );

        const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
        const nextWeekStart = addDays(currentWeekStart, 7);

        const scheduleMeals = (mealArray, mealType, startDate) => {
          for (let i = 0; i < 7; i++) {
            const date = addDays(startDate, i);
            if (mealArray.length > 0) {
              const recipe = mealArray.pop();
              get().addRecipeToSchedule(recipe, mealType, date);
            }
          }
        };

        scheduleMeals(breakfastRecipes, "Breakfast", currentWeekStart);
        scheduleMeals(lunchRecipes, "Lunch", currentWeekStart);
        scheduleMeals(dinnerRecipes, "Dinner", currentWeekStart);

        scheduleMeals(breakfastRecipes, "Breakfast", nextWeekStart);
        scheduleMeals(lunchRecipes, "Lunch", nextWeekStart);
        scheduleMeals(dinnerRecipes, "Dinner", nextWeekStart);
      },
    }),
    {
      name: "meal-plan-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useMealPlanStore;
