import useTokenStore from "@/stores/useTokenStore";
import api from "../api";

export const checkGoogleLinkStatus = async () => {
  try {
    const response = await api.get("/oauth/google-link-status", {
      withCredentials: true,
    });

    return response.data.isLinked;
  } catch (error) {
    console.error("Error checking Google link status:", error);
    throw error;
  }
};

export const authorizeGoogleCalendar = () => {
  try {
    const currentUrl = window.location.href;

    const token = useTokenStore.getState().token;

    if (!token) {
      console.error("JWT not found. User might not be authenticated.");
      return;
    }

    const oauthUrl = `http://localhost:5271/api/oauth/authorize?redirectUrl=${encodeURIComponent(
      currentUrl
    )}&jwt=${encodeURIComponent(token)}`;

    console.log("Initiating OAuth flow: Redirecting to:", oauthUrl);

    window.location.href = oauthUrl;
  } catch (error) {
    console.error("Error initiating OAuth flow:", error);
  }
};

export const handleOAuthCallback = async (code) => {
  try {
    const callbackUrl = `/oauth/callback?code=${code}`;
    console.log("Handling OAuth callback with URL:", callbackUrl);

    const response = await api.get(callbackUrl, {
      withCredentials: true,
    });

    console.log("OAuth callback response received:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error during OAuth callback:", error);
    throw error;
  }
};
