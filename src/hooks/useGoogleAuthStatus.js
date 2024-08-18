import { useQuery } from "@tanstack/react-query";
import { checkGoogleLinkStatus } from "@/lib/oauthApi";

export const useGoogleAuthStatus = () => {
  return useQuery({
    queryKey: ["googleAuthStatus"], // Change this to an array
    queryFn: checkGoogleLinkStatus,

    retry: true, // Disable retrying on failure
    onSuccess: (data) => {
      console.log("Google auth status successfully fetched:", data);
    },
    onError: (error) => {
      console.error("Error fetching Google auth status:", error);
    },
  });
};
