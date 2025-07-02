import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/asaxiy-logo.svg";
import "./Header.css";
import { useStateValue } from "../context";
const Header = () => {
  const [isauth, setisauth] = useState(false);
  const { wishlist, search, setsearch, productss } = useStateValue();
  const [selectedCategory, setSelectedCategory] = useState("all");
  useEffect(() => {
    const isauth = localStorage.getItem("accessToken");
    if (isauth) {
      setisauth(true);
    } else {
      setisauth(false);
    }
  }, []);
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="" />
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            type="text"
            placeholder="Qidirish..."
          />
        </div>
        <nav>
          <NavLink to="/homepage">HomePage</NavLink>
          {isauth && <NavLink to="/profile">Profile</NavLink>}
          <NavLink to="/newspage">NewsPage {wishlist.length}</NavLink>
          {!isauth && <NavLink to="/LoginPage">Login</NavLink>}
          <NavLink to="/newpage">NewPage</NavLink>
        </nav>
      </div>
    </>
  );
};

export default Header;
