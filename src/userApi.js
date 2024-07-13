// userApi.js

import api from "./api";

export const loginUser = async ({ username, password }) => {
  const response = await api.post("/users/login", { username, password });
  return response.data;
};

export const registerUser = async ({
  username,
  email,
  password,
  firstName,
  lastName,
}) => {
  const response = await api.post("/users/register", {
    username,
    email,
    password,
    firstName,
    lastName,
  });
  return response.data;
};

export const fetchUserInfo = async () => {
  const response = await api.get("/users/current-user");
  return response.data;
};

export const fetchProtectedData = async () => {
  const response = await api.get("/users/protected-endpoint", {
    withCredentials: true,
  });
  return response.data.message;
};
