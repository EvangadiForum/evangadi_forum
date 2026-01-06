// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import "./Signup.css"; // Make sure to import the CSS
import styles from "../login/Login.module.css"; // Import CSS module
import About from "../../comopnents/about/About";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate all fields are filled
    if (!form.firstName.trim()) {
      setError("First name is required");
      return;
    }

    if (!form.lastName.trim()) {
      setError("Last name is required");
      return;
    }

    if (!form.username.trim()) {
      setError("Username is required");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!form.password) {
      setError("Password is required");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      console.log("Sending signup data:", form);
      const response = await api.post("/auth/signup", form);

      console.log("Signup successful:", response.data); //message to the user

      navigate("/login");
    } catch (err) {
      // console.error("Signup error:", err);
      // console.error("Error response:", err.response?.data);
      //  console.error("Error status:", err.response?.status);
      setError(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <section className={styles.loginContainer}>
      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2>Join the Network</h2>
        </div>

        <div className={styles.accountPrompt}>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ fontWeight: "600", color: "gold" }}>
              Signin
            </Link>
          </p>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {/* Email - Full Width - First */}
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* First Name & Last Name - Side by Side */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password with Show/Hide Toggle */}
          <div className={styles.passwordWrapper}>
            <div className={styles.inputGroup} style={{ width: "100%" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (min 8 characters)"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <GoEyeClosed /> // Password visible → Show closed eye (click to hide)
                ) : (
                  <GoEye /> // Password hidden → Show open eye (click to show)
                )}{" "}
              </button>
            </div>
          </div>

          {/* Username */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Agree and Join
          </button>
        </form>

        <div className={styles.termsOfUse}>
          <p>
            I agree to the{" "}
            <a
              style={{
                color: "gold",
                paddingTop: "10px",
                textAlign: "center",
                lineHeight: "0.5rem",
              }}
            >
              privacy policy
            </a>{" "}
            and{" "}
            <a
              style={{
                color: "gold",
                textAlign: "center !important",
                lineHeight: "0.5rem",
              }}
            >
              {" "}
              terms of services
            </a>
          </p>
          <p style={{ color: "gold" }}>Already have an account?</p>
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
}
