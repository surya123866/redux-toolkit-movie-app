import React from "react";
import { Link } from "react-router-dom";
import user from "../../images/Avatar.png";
import "./Header.css";

export function Header() {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
}
