import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./Login.module.css"; // Import CSS module
import { BiHide } from "react-icons/bi";
import { GoEye } from "react-icons/go";
import About from "../../comopnents/about/About.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Add state for show/hide
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );

      console.log("Login successful:", response.data);
      loginUser(response.data.user, response.data.token);
      navigate("/home");
    } catch (error) {
      // console.error("Login failed", error);
      // console.error("Error details:", error.response?.data);

      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);

      if (
        error.response?.status === 404 ||
        errorMessage.toLowerCase().includes("user not found") ||
        errorMessage.toLowerCase().includes("does not exist")
      ) {
        const shouldSignup = window.confirm(
          "User not found. Would you like to sign up?"
        );
        if (shouldSignup) {
          navigate("/signup");
        }
      }
    }
  };

  return (
    <section className={styles.loginContainer}>
      {/* Left side - Login form */}
      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h4>Login to your account</h4>

          {/* Two paragraphs side by side */}
          <div className={styles.accountPrompt}>
            <p>Don't have an account?</p>
            <p style={{ fontWeight: "600", color: "gold" }}>
              Create a new account
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {error && <div className={styles.error}>{error}</div>}

            {/* Email and Password side by side */}
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePassword}
                >
                  {showPassword ? <BiHide /> : <GoEye />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>

          {/* Sign up link */}
          <div className={styles.signUp}>
            <p>
              <button
                onClick={() => navigate("/signup")}
                className={styles.signUpBtn}
              >
                Create account?
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - About section */}
      <About />
      {/* <div className={styles.leftSection}>
        <div className={styles.aboutContent}>
          <p style={{ color: "gold" }}>About</p>
          <h2>EvaFor Q&A</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            numquam quas recusandae facere adipisci amet consectetur iste ab
            asperiores, harum, ipsum, reiciendis atque facilis qui labore enim
            totam magni esse!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            nam sunt quo blanditiis voluptas maxime beatae animi molestias
            architecto alias commodi quas, consectetur cum accusamus temporibus
            aspernatur! Voluptas, modi nisi.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
            ab, ad voluptatum cupiditate blanditiis exercitationem ipsam.
            Incidunt, voluptatum minima facere quas vel fuga iusto optio
            deserunt magnam ipsa fugiat iure?
          </p>
          <div>
            <Link to="/how-it-works">
              <button className={styles.howItWorksBtn}>How It Works</button>
            </Link>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Login;

//=============================================================
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import styles from "./Login.module.css"; // Import CSS module

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { loginUser } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       console.log("Login successful:", response.data);
//       loginUser(response.data.user, response.data.token);
//       navigate("/home");
//     } catch (error) {
//       console.error("Login failed", error);
//       console.error("Error details:", error.response?.data);

//       const errorMessage = error.response?.data?.message || error.message;
//       setError(errorMessage);

//       if (
//         error.response?.status === 404 ||
//         errorMessage.toLowerCase().includes("user not found") ||
//         errorMessage.toLowerCase().includes("does not exist")
//       ) {
//         const shouldSignup = window.confirm(
//           "User not found. Would you like to sign up?"
//         );
//         if (shouldSignup) {
//           navigate("/signup");
//         }
//       }
//     }
//   };

//   return (
//     <section className={styles.loginContainer}>
//       {/* Left side - Login form */}
//       <div className={styles.rightSection}>
//         <div className={styles.formContainer}>
//           <h4>Login to your account</h4>

//           {/* Two paragraphs side by side */}
//           <div className={styles.accountPrompt}>
//             <p>Don't have an account?</p>
//             <p style={{ fontWeight: "600" }}>Create a new account</p>
//           </div>

//           {/* Login form */}
//           <form onSubmit={handleSubmit} className={styles.loginForm}>
//             {error && <div className={styles.error}>{error}</div>}

//             {/* Email and Password side by side */}
//             <div className={styles.inputGroup}>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Submit button */}
//             <button type="submit" className={styles.submitBtn}>
//               Submit
//             </button>
//           </form>

//           {/* Sign up link */}
//           <div className={styles.signUp}>
//             <p>
//               <button
//                 onClick={() => navigate("/signup")}
//                 className={styles.signUpBtn}
//               >
//                 Create account?
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right side - About section */}
//       <div className={styles.leftSection}>
//         <div className={styles.aboutContent}>
//           <p>About</p>
//           <h3>EvaFor Q&A</h3>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
//             numquam quas recusandae facere adipisci amet consectetur iste ab
//             asperiores, harum, ipsum, reiciendis atque facilis qui labore enim
//             totam magni esse!
//           </p>
//           <p>
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
//             nam sunt quo blanditiis voluptas maxime beatae animi molestias
//             architecto alias commodi quas, consectetur cum accusamus temporibus
//             aspernatur! Voluptas, modi nisi.
//           </p>
//           <p>
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
//             ab, ad voluptatum cupiditate blanditiis exercitationem ipsam.
//             Incidunt, voluptatum minima facere quas vel fuga iusto optio
//             deserunt magnam ipsa fugiat iure?
//           </p>
//           <div>
//             <button className={styles.howItWorksBtn}>How It Works</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;
