// OAuth authorize method
export const authorizeGoogleCalendar = () => {
  try {
    const oauthUrl = "http://localhost:5271/api/oauth/authorize"; // Correct backend URL
    console.log("Initiating OAuth flow: Redirecting to:", oauthUrl);
    window.location.href = oauthUrl; // Redirect to the backend authorize endpoint
  } catch (error) {
    console.error("Error initiating OAuth flow:", error);
  }
};

// OAuth callback handling
export const handleOAuthCallback = async (code) => {
  try {
    const callbackUrl = `http://localhost:5271/api/oauth/callback?code=${code}`; // Correct backend URL for callback
    console.log("Handling OAuth callback with URL:", callbackUrl);
    const response = await fetch(callbackUrl, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error(
        "OAuth callback failed with status:",
        response.status,
        "Response text:",
        await response.text()
      );
      throw new Error(`OAuth callback failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("OAuth callback response received:", data);

    return data;
  } catch (error) {
    console.error("Error during OAuth callback:", error);
    throw error;
  }
};
