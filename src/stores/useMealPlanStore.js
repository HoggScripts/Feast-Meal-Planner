import { addDays, startOfWeek } from "date-fns";
import { persist } from "zustand/middleware";
import { create } from "zustand";

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

          // Add the recipe to the scheduled recipes
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
    }),
    {
      name: "meal-plan-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useMealPlanStore;
