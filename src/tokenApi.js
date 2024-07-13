import api from "./api";

export const refreshToken = async () => {
  const { data } = await api.post("/users/refresh-token", null, {
    withCredentials: true, // Include credentials to send cookies
  });
  return data.accessToken; // Return the accessToken string directly
};
