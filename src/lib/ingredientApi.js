import api from "../api";

export const searchIngredients = async (query) => {
  const response = await api.get(`/ingredients/search`, {
    params: { query },
  });
  return response.data;
};

export const getPossibleUnits = async (id) => {
  const response = await api.get(`/ingredients/${id}/possible-units`);
  return response.data;
};

export const getIngredientDetails = async (id, amount, unit) => {
  const response = await api.get(`/ingredients/${id}/details`, {
    params: { amount, unit },
  });
  return response.data;
};
