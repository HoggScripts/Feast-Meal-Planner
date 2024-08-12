import { authorizeGoogleCalendar, handleOAuthCallback } from "@/lib/oauthApi";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { SiGooglecalendar } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

const LinkGoogleCalendarButton = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("LinkGoogleCalendarButton rendered");

    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    console.log("Query Params:", queryParams.toString());
    console.log("Authorization code:", code);

    if (code) {
      handleOAuthCallback(code)
        .then((tokens) => {
          console.log("OAuth tokens received:", tokens);
        })
        .catch((error) => {
          console.error("Error handling OAuth callback:", error);
        });
    } else {
      console.log("No authorization code found in URL.");
    }
  }, [location]);

  const handleLinkClick = () => {
    console.log("Link Google Calendar button clicked");
    authorizeGoogleCalendar();
  };

  return (
    <Button
      icon={<SiGooglecalendar />}
      auto
      shadow
      onClick={handleLinkClick}
      className="bg-white text-blueprimary border-2 border-blueprimary hover:bg-gray-200"
    >
      <FcGoogle className="mr-2" /> Link with Google Calendar{" "}
      <SiGooglecalendar />
    </Button>
  );
};

export default LinkGoogleCalendarButton;
