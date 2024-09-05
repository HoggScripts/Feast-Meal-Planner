import api from "../api";

export const refreshToken = async () => {
  const { data } = await api.post("/users/refresh-token", null, {
    withCredentials: true,
  });
  return data.accessToken;
};
