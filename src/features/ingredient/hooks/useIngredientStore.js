import { create } from "zustand";

const useIngredientStore = create((set) => ({
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
  setSearchResults: (results) => set({ searchResults: results }),
  updateCurrentIngredient: (update) =>
    set((state) => ({
      currentIngredient: { ...state.currentIngredient, ...update },
    })),
  addIngredient: (ingredient) =>
    set((state) => {
      const newIngredients = [...state.ingredients, ingredient];
      console.log("New ingredient added:", ingredient);
      console.log("Updated list of ingredients:", newIngredients);
      return { ingredients: newIngredients };
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
    set((state) => ({
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    })),
  clearIngredients: () => set({ ingredients: [] }),
}));

export default useIngredientStore;
