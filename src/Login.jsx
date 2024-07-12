// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "./authStore";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login form submitted");
      console.log("Sending login request to backend");
      const response = await axios.post(
        "http://localhost:5271/api/users/login",
        { username, password },
        { withCredentials: true } // Include this line to send cookies with the request
      );
      console.log("Login successful, response data:", response.data);
      setToken(response.data.accessToken);

      // Navigate to the user info page
      navigate("/user-info");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
