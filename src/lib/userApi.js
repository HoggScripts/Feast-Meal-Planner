import api from "../api";

export const loginUser = async ({ identifier, password, rememberMe }) => {
  const response = await api.post("/users/login", {
    identifier,
    password,
    rememberMe,
  });
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

export const logoutUser = async () => {
  const response = await api.post(
    "/users/logout",
    {},
    { withCredentials: true }
  );
  return response.data;
};

export const requestResetPassword = async ({ email }) => {
  const response = await api.post("/users/reset-password", { email });
  return response.data;
};

export const confirmResetPassword = async ({ email, token, newPassword }) => {
  const response = await api.post("/users/confirm-reset-password", {
    email,
    token,
    newPassword,
  });
  return response.data;
};
