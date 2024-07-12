// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import UserInfo from "./UserInfo";
import AuthProvider from "./AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-info" element={<UserInfo />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
