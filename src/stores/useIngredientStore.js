import { create } from "zustand";
import { persist } from "zustand/middleware";

// Middleware to log state changes
const logStateChange = (config) => (set, get, api) =>
  config(
    (args) => {
      set(args);
      console.log("State changed:", get());
    },
    get,
    api
  );

const useIngredientStore = create(
  logStateChange(
    persist(
      (set, get) => ({
        ingredients: [],
        searchResults: [],
        currentIngredient: {
          id: null,
          name: "",
          image: "",
          amount: 0,
          unit: "",
          calories: null,
          fat: null,
          protein: null,
          carbohydrates: null,
          estimatedCost: null,
          possibleUnits: [],
        },
        selectedCurrency: "USD", // default currency
        originalCosts: {}, // store original costs in USD

        setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),

        setSearchResults: (results) => set({ searchResults: results }),

        updateCurrentIngredient: (update) =>
          set((state) => ({
            currentIngredient: { ...state.currentIngredient, ...update },
          })),

        addIngredient: (ingredient) =>
          set((state) => {
            const newIngredients = [...state.ingredients, ingredient];
            const originalCosts = {
              ...state.originalCosts,
              [ingredient.id]: ingredient.estimatedCost,
            };
            return { ingredients: newIngredients, originalCosts };
          }),

        clearCurrentIngredient: () =>
          set({
            currentIngredient: {
              id: null,
              name: "",
              image: "",
              amount: 0,
              unit: "",
              calories: null,
              fat: null,
              protein: null,
              carbohydrates: null,
              estimatedCost: null,
              possibleUnits: [],
            },
          }),

        removeIngredient: (id) =>
          set((state) => {
            const ingredients = state.ingredients.filter(
              (ingredient) => ingredient.id !== id
            );
            const { [id]: _, ...originalCosts } = state.originalCosts;
            return { ingredients, originalCosts };
          }),

        clearIngredients: () => set({ ingredients: [], originalCosts: {} }),

        convertCurrency: async (targetCurrency) => {
          const { ingredients, originalCosts } = get();
          const updatedIngredients = await Promise.all(
            ingredients.map(async (ingredient) => {
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

          set({ ingredients: updatedIngredients });
        },
      }),
      {
        name: "ingredient-storage", // unique name for the storage
        getStorage: () => localStorage, // specify the storage to use
      }
    )
  )
);

export default useIngredientStore;
