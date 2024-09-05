import { useQuery } from "@tanstack/react-query";
import { checkGoogleLinkStatus } from "@/lib/oauthApi";

export const useGoogleAuthStatus = () => {
  return useQuery({
    queryKey: ["googleAuthStatus"],
    queryFn: checkGoogleLinkStatus,

    retry: true,
    onSuccess: (data) => {
      console.log("Google auth status successfully fetched:", data);
    },
    onError: (error) => {
      console.error("Error fetching Google auth status:", error);
    },
  });
};
