import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import styles from "./Header.module.css";
import Logo from "../assets/EvaLogo4.png";
export default function Header() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navLinks}>
        {/* Logo - redirects to home or login based on auth status */}
        <Link to={user ? "/home" : "/login"} className={styles.logo}>
          <img src={Logo} alt="EvaFor Logo" />
        </Link>

        {/* Home - redirects to home or login */}
        <Link to={user ? "/home" : "/login"} className={styles.navLink}>
          Home
        </Link>

        {/* How It Works - redirects to documentation */}
        <Link to="/how-it-works" className={styles.navLink}>
          How it works
        </Link>

        {/* Sign In - only shows when user is not logged in */}
        {!user && (
          <Link to="/login" className={styles.navLink}>
            Sign In
          </Link>
        )}

        {/* Logout - only shows when user is logged in */}
        {user && (
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

// import { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// // import Docomentation from "../pages/documentation/Docomentation";
// import "./Header.module.css";

// export default function Header() {
//   const { user, logoutUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logoutUser();
//     navigate("/login");
//   };

//   return (
//     <header className="header">
//       <div className="header-left">
//         <Link to="/" className="logo">
//           {/*EvaFor Q&A*/}
//           Logo
//         </Link>
//       </div>

//       <div className="header-left">
//         <Link to="/" className="logo">
//           {/*EvaFor Q&A*/}
//           Home
//         </Link>
//       </div>

//       <div className="header-left">
//         <Link to="/documentation" className="logo">
//           {/*EvaFor Q&A*/}
//           How it works
//         </Link>
//       </div>
//       <div className="header-left">
//         {!user && (
//           <Link to="/login" className="nav-link">
//             Sign In
//           </Link>
//         )}
//       </div>

//       {user && (
//         <div className="header-right">
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }
