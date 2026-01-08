import React, { useContext } from "react";
import module from "./header.module.css";
import evangadi from "../../../public/evangadi.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppState } from "../../App";

function Header() {
  const { setUser } = useContext(AppState);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({});
    navigate("/login");
  };

  return (
    <div className={module.header}>
      <div className={module.logo}>
        <Link to={isLoggedIn ? "/" : "/login"}>
          <img src={evangadi} alt="Evangadi Logo" />
        </Link>
          </div>
          
      <div className={module.text}>
        <Link to={isLoggedIn ? "/" : "/login"} style={{ textDecoration: "none", color: "rgba(0,0,0,.55)" }}>
          <p>Home</p>
        </Link>

        <Link to="#" style={{textDecoration: "none", color: "rgba(0,0,0,.55)", marginRight: "20px", }}>
          <p>How it Works</p>
        </Link>
      </div>

      {/* Auth btn sooooooo annoying*/}
      <div className={module.btn}>
        {!isLoggedIn ? (
          <Link to="/login">
            <button>SIGN IN</button>
          </Link>
              ) : (
            <Link to="/">
              <button onClick={handleLogout}>LOGOUT</button>
            </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
