import {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
  useContext,
} from "react";
import api from "./api";
import { toast } from "react-toastify";

// Create a context for authentication
const AuthContext = createContext(undefined);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component that provides authentication logic
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // State to hold the JWT token
  const [isLoading, setIsLoading] = useState(true); // State to indicate if authentication is in progress

  // Function to refresh the token
  const refreshToken = async () => {
    try {
      console.log("Attempting to refresh token...");
      const response = await api.post("/users/refresh-token");
      setToken(response.data.accessToken);
      console.log("Token refreshed successfully:", response.data.accessToken);
      return true;
    } catch (error) {
      console.log("Failed to refresh token:", error);
      return false;
    }
  };

  // Function to fetch the current user
  const fetchCurrentUser = async () => {
    try {
      console.log("Fetching current user...");
      const response = await api.get("/users/current-user");
      console.log("Current user fetched:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching current user:", error);
      throw error;
    }
  };

  // Initialize authentication on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("Initializing authentication...");
      try {
        const currentUser = await fetchCurrentUser();
        console.log("Current user fetched:", currentUser);
        setIsLoading(false);
      } catch (error) {
        if (error.response?.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            try {
              const currentUser = await fetchCurrentUser();
              console.log(
                "Current user fetched after token refresh:",
                currentUser
              );
              setIsLoading(false);
            } catch (error) {
              console.log(
                "Failed to fetch current user after token refresh:",
                error
              );
              setIsLoading(false);
            }
          } else {
            console.log("Token refresh failed. User is not authenticated.");
            setIsLoading(false);
          }
        } else {
          console.log("Error during authentication initialization:", error);
          setIsLoading(false);
        }
      }
    };

    initializeAuth();
  }, []);

  // Add token to the headers of every outgoing request
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (token && !config._retry) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Cleanup function to eject the interceptor when the component unmounts
    return () => {
      console.log("Ejecting auth interceptor");
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  // Handle response errors and refresh the token if needed
  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // Mark the request as a retry
          const refreshed = await refreshToken();
          if (refreshed) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          } else {
            setToken(null); // Clear the token if the refresh token request fails
            toast.error("Session expired. Please log in again.");
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to eject the interceptor when the component unmounts
    return () => {
      console.log("Ejecting refresh interceptor");
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {!isLoading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
