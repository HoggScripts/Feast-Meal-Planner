import React from "react";
import { Button } from "@nextui-org/react";
import { SiGooglecalendar } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuthStatus } from "@/hooks/useGoogleAuthStatus";
import { authorizeGoogleCalendar } from "@/lib/oauthApi";
import { IoIosCheckmarkCircle, IoMdCheckmark } from "react-icons/io";

const LinkGoogleCalendarButton = () => {
  const { data: isGoogleLinked, isLoading } = useGoogleAuthStatus();

  const handleLinkClick = () => {
    authorizeGoogleCalendar();
  };

  return (
    <Button
      auto
      shadow
      onClick={handleLinkClick}
      className={`${
        isGoogleLinked
          ? "bg-white text-blueprimary border-2 border-green-500 hover:bg-gray-200 text-green-500"
          : "bg-white text-blueprimary border-2 border-blueprimary hover:bg-gray-200"
      }`}
      disabled={isGoogleLinked || isLoading} // Disable the button if linked or loading
    >
      {isGoogleLinked ? (
        <>
          <FcGoogle className="mr-1" /> Google Calendar Linked
          <IoIosCheckmarkCircle className="ml-1 text-green-500" />
        </>
      ) : (
        <>
          <FcGoogle className="mr-1" /> Link with Google Calendar
          <SiGooglecalendar className="ml-1" />
        </>
      )}
    </Button>
  );
};

export default LinkGoogleCalendarButton;
