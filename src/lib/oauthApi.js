import useTokenStore from "@/stores/useTokenStore";
import api from "../api"; // Import your Axios instance

export const checkGoogleLinkStatus = async () => {
  try {
    const response = await api.get("/oauth/google-link-status", {
      withCredentials: true, // Ensure cookies are included
    });

    return response.data.isLinked;
  } catch (error) {
    console.error("Error checking Google link status:", error);
    throw error;
  }
};

// OAuth authorize method
export const authorizeGoogleCalendar = () => {
  try {
    const currentUrl = window.location.href; // Capture the current page URL

    // Get the JWT from Zustand store or from session/local storage
    const token = useTokenStore.getState().token;

    if (!token) {
      console.error("JWT not found. User might not be authenticated.");
      return;
    }

    // Pass the current URL and JWT to the backend
    const oauthUrl = `http://localhost:5271/api/oauth/authorize?redirectUrl=${encodeURIComponent(
      currentUrl
    )}&jwt=${encodeURIComponent(token)}`;

    console.log("Initiating OAuth flow: Redirecting to:", oauthUrl);

    // Redirect to the backend authorize endpoint
    window.location.href = oauthUrl;
  } catch (error) {
    console.error("Error initiating OAuth flow:", error);
  }
};

// OAuth callback handling
export const handleOAuthCallback = async (code) => {
  try {
    const callbackUrl = `/oauth/callback?code=${code}`; // Use relative URL since baseURL is set in the Axios instance
    console.log("Handling OAuth callback with URL:", callbackUrl);

    const response = await api.get(callbackUrl, {
      withCredentials: true, // Ensure cookies are included
    });

    console.log("OAuth callback response received:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error during OAuth callback:", error);
    throw error;
  }
};
