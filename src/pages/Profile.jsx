import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import API from "../API/api";
const Profile = () => {
  const [user, setuser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    API.get("/auth/me").then((res) => {
      setuser(res?.data);
    });
  }, []);
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" replace />;
  }
  const handllogout = () => {
    navigate("/login");
    localStorage.removeItem("accessToken");
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Profile Page</h2>
      <img src={user.image} alt={user.username} width={100} />
      <p>
        <strong>Ismi:</strong> {user.firstName}
      </p>
      <p>
        <strong>Familiyasi:</strong> {user.lastName}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Jinsi:</strong> {user.gender}
      </p>
      <button onClick={handllogout} className="btn">
        Logout
      </button>
    </div>
  );
};

export default Profile;
