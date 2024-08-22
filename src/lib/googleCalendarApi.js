import api from "../api"; // Import your Axios instance

export const scheduleRecipesOnGoogleCalendar = async (
  scheduledRecipesRequest
) => {
  try {
    const response = await api.post(
      "googlecalendar/schedule-recipes",
      scheduledRecipesRequest,
      {
        withCredentials: true, // Ensure cookies are included
      }
    );

    console.log(
      "Recipes scheduled on Google Calendar successfully:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error("Error scheduling recipes on Google Calendar:", error);
    throw error;
  }
};
