import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMealPlanStore = create(
  persist(
    (set, get) => ({
      scheduledRecipes: [],
      shoppingList: [],

      addRecipeToSchedule: (recipe, mealType, datetime) => {
        set((state) => {
          const newScheduledRecipes = [
            ...state.scheduledRecipes,
            { recipe, mealType, datetime },
          ];
          const newShoppingList = [
            ...state.shoppingList,
            ...recipe.ingredients,
          ];
          return {
            scheduledRecipes: newScheduledRecipes,
            shoppingList: [...new Set(newShoppingList)], // Ensure no duplicates
          };
        });
      },

      removeRecipeFromSchedule: (recipeId, mealType, datetime) => {
        set((state) => {
          const newScheduledRecipes = state.scheduledRecipes.filter(
            (item) =>
              item.recipe.id !== recipeId ||
              item.mealType !== mealType ||
              new Date(item.datetime).getTime() !== new Date(datetime).getTime()
          );
          const newShoppingList = state.shoppingList.filter((ingredient) => {
            return newScheduledRecipes.some((item) =>
              item.recipe.ingredients.includes(ingredient)
            );
          });
          return {
            scheduledRecipes: newScheduledRecipes,
            shoppingList: newShoppingList,
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
      name: "meal-plan-storage", // unique name for localStorage key
      getStorage: () => localStorage, // use localStorage for persistence
    }
  )
);

export default useMealPlanStore;
