import api from "../api"; // Import your Axios instance

export const sendShoppingListEmail = async (shoppingListRequest) => {
  try {
    const response = await api.post(
      "/api/email/send-shopping-list",
      shoppingListRequest,
      {
        withCredentials: true, // Ensure cookies are included
      }
    );

    console.log("Shopping list email sent successfully:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error sending shopping list email:", error);
    throw error;
  }
};
