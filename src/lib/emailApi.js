import api from "../api";

export const sendShoppingListEmail = async (shoppingListRequest) => {
  try {
    const response = await api.post(
      "/email/send-shopping-list",
      shoppingListRequest,
      {
        withCredentials: true,
      }
    );

    console.log("Shopping list email sent successfully:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error sending shopping list email:", error);
    throw error;
  }
};
