// import { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext.jsx";
// import styles from "./Header.module.css";
// import Logo from "../assets/EvaLogo4.png";
// export default function Header() {
//   const { user, logoutUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logoutUser();
//     navigate("/login");
//   };

//   return (
//     <header className={styles.header}>
//       <nav className={styles.navLinks}>
//         {/* Logo - redirects to home or login based on auth status */}
//         <Link to={user ? "/home" : "/login"} className={styles.logo}>
//           <img src={Logo} alt="EvaFor Logo" />
//         </Link>

//         {/* Home - redirects to home or login */}
//         <Link to={user ? "/home" : "/login"} className={styles.navLink}>
//           Home
//         </Link>

//         {/* How It Works - redirects to documentation */}
//         <Link to="/how-it-works" className={styles.navLink}>
//           How it works
//         </Link>

//         {/* Sign In - only shows when user is not logged in */}
//         {!user && (
//           <Link to="/login" className={styles.navLink}>
//             Sign In
//           </Link>
//         )}

//         {/* Logout - only shows when user is logged in */}
//         {user && (
//           <button className={styles.logoutBtn} onClick={handleLogout}>
//             Logout
//           </button>
//         )}
//       </nav>
//     </header>
//   );
// }

import React, { useContext } from "react";
import module from "./header.module.css";
import evangadi from "../../public/evangadi.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { AppState } from "../../App";

function Header() {
  // const { setUser } = useContext(AppState);
  const navigate = useNavigate();
  // const location = useLocation();

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
        <Link
          to={isLoggedIn ? "/" : "/login"}
          style={{ textDecoration: "none", color: "rgba(0,0,0,.55)" }}
        >
          <p>Home</p>
        </Link>

        <Link
          to="#"
          style={{
            textDecoration: "none",
            color: "rgba(0,0,0,.55)",
            marginRight: "20px",
          }}
        >
          <p>How it Works</p>
        </Link>
      </div>

      {/* Auth btn sooooooo annoying*/}
      <div className={module.btn}>
        {!isLoggedIn ? (
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        ) : (
          <Link to="/">
            <button onClick={handleLogout}>LogOut</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
