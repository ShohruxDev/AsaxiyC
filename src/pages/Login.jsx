import React, { useState } from "react";
import API from "../API/api";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/profile" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", {
        username: username,
        password: password,
      });
      if (res.data && res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        console.log("Access Token saqlandi:");
        if (res.status === 200) {
          navigate("/profile");
        }
      } else {
        console.error("Javobda accessToken yo'q.");
      }
    } catch (error) {
      console.error(
        "Login muvaffaqiyatsiz:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="emilys"
        autoComplete="username"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="emilyspass"
        autoComplete="current-password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
