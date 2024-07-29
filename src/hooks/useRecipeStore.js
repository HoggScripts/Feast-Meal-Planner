import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipe: {
        id: null,
        recipeName: "",
        image: null,
        servings: 1,
        cookTime: 1,
        ingredients: [],
        instructions: [],
        nutritionalInfo: {
          calories: 0,
          fat: 0,
          protein: 0,
          carbohydrates: 0,
        },
        cost: {
          original: 0,
          converted: 0,
        },
        selectedCurrency: "USD",
      },
      originalCosts: {},

      setRecipeInfo: (info) =>
        set((state) => ({
          recipe: { ...state.recipe, ...info },
        })),

      addIngredient: (ingredient) =>
        set((state) => {
          const newIngredients = [...state.recipe.ingredients, ingredient];
          const originalCosts = {
            ...state.originalCosts,
            [ingredient.id]: ingredient.estimatedCost,
          };
          return {
            recipe: { ...state.recipe, ingredients: newIngredients },
            originalCosts,
          };
        }),

      removeIngredient: (id) =>
        set((state) => {
          const ingredients = state.recipe.ingredients.filter(
            (ingredient) => ingredient.id !== id
          );

          // Using filter to create a new object without the id
          const originalCosts = Object.keys(state.originalCosts)
            .filter((key) => key !== id.toString())
            .reduce((result, current) => {
              result[current] = state.originalCosts[current];
              return result;
            }, {});

          return { recipe: { ...state.recipe, ingredients }, originalCosts };
        }),

      clearRecipe: () =>
        set({
          recipe: {
            id: null,
            recipeName: "",
            image: null,
            servings: 1,
            cookTime: 1,
            ingredients: [],
            instructions: [],
            nutritionalInfo: {
              calories: 0,
              fat: 0,
              protein: 0,
              carbohydrates: 0,
            },
            cost: {
              original: 0,
              converted: 0,
            },
            selectedCurrency: "USD",
          },
          originalCosts: {},
        }),

      setInstructions: (instructions) =>
        set((state) => ({
          recipe: { ...state.recipe, instructions },
        })),

      convertCurrency: async (targetCurrency) => {
        const { recipe, originalCosts } = get();
        const updatedIngredients = await Promise.all(
          recipe.ingredients.map(async (ingredient) => {
            const originalCost = originalCosts[ingredient.id];
            if (!originalCost) return ingredient;

            if (targetCurrency === "USD") {
              return { ...ingredient, estimatedCost: originalCost };
            }

            const res = await fetch(
              `https://api.frankfurter.app/latest?amount=${originalCost}&from=USD&to=${targetCurrency}`
            );
            const data = await res.json();
            const convertedCost = data.rates[targetCurrency];

            return { ...ingredient, estimatedCost: convertedCost };
          })
        );

        set({
          recipe: {
            ...recipe,
            ingredients: updatedIngredients,
            selectedCurrency: targetCurrency,
          },
        });
      },
    }),
    {
      name: "recipe-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useRecipeStore;
