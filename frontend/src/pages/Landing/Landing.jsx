import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import styles from "./Landing.module.css";

export default function Landing() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | signup
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
  });

  function update(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setInfo("");

    try {
      if (mode === "signup") {
        if (
          !form.email ||
          !form.password ||
          !form.first_name ||
          !form.last_name ||
          !form.username
        ) {
          setErr("Please fill all fields");
          return;
        }
        if (form.password.length < 8) {
          setErr("Password must be at least 8 characters");
          return;
        }

        await register({
          email: form.email,
          password: form.password,
          first_name: form.first_name,
          last_name: form.last_name,
          username: form.username,
        });

        setMode("login");
        setInfo("Account created. Please sign in.");
        return;
      }

      await login(form.email, form.password);
      navigate("/home");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.card}>
          <h2 className={styles.title}>
            {mode === "login" ? "Login to your account" : "Join the network"}
          </h2>

          <p className={styles.switchText}>
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  className={styles.linkBtn}
                  onClick={() => setMode("signup")}
                >
                  Create a new account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  className={styles.linkBtn}
                  onClick={() => setMode("login")}
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          {err && <div className={styles.alert}>{err}</div>}
          {info && <div className={styles.info}>{info}</div>}

          <form className={styles.form} onSubmit={onSubmit}>
            <input
              className={styles.input}
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />

            {mode === "signup" && (
              <>
                <div className={styles.row}>
                  <input
                    className={styles.input}
                    placeholder="First Name"
                    value={form.first_name}
                    onChange={(e) => update("first_name", e.target.value)}
                  />
                  <input
                    className={styles.input}
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={(e) => update("last_name", e.target.value)}
                  />
                </div>

                <input
                  className={styles.input}
                  placeholder="User Name"
                  value={form.username}
                  onChange={(e) => update("username", e.target.value)}
                />
              </>
            )}

            <input
              className={styles.input}
              placeholder="Your Password"
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
            />

            <button
              className={mode === "login" ? styles.submit : styles.join}
              type="submit"
            >
              {mode === "login" ? "SUBMIT" : "AGREE AND JOIN"}
            </button>

            {mode === "login" ? (
              <button
                type="button"
                className={styles.secondary}
                onClick={() => setMode("signup")}
              >
                Create an account?
              </button>
            ) : (
              <p className={styles.smallMuted}>
                I agree to the{" "}
                <span className={styles.orange}>privacy policy</span> and{" "}
                <span className={styles.orange}>terms of service</span>.
              </p>
            )}
          </form>
        </div>
      </div>

      <div className={styles.right}>
        <p className={styles.about}> About </p>
        <h1 className={styles.heroTitle}>Evangadi Networks Q&amp;A</h1>
        <p className={styles.heroText}>
          Evangadi Forum is a community-driven question and answer platform
          designed to help learners grow through collaboration and shared
          knowledge. It provides a space where users can ask programming and
          technology-related questions, explore solutions from others, and
          contribute their own expertise. By encouraging open discussion and
          problem-solving, Evangadi Forum creates an environment where students
          learn not just from content, but from each other.
        </p>
        <br />
        <p>
          Built with modern web technologies, Evangadi Forum focuses on speed,
          security, and ease of use to deliver a smooth learning experience.
          With features like user authentication, question posting, and
          community-powered answers, the platform supports meaningful
          interaction and continuous learning. Our goal is to make technical
          education more accessible and engaging by connecting people who want
          to learn and help others succeed.
        </p>
        <button
          className={styles.howBtn}
          onClick={() => navigate("/how-it-works")}
        >
          HOW IT WORKS
        </button>
      </div>
    </div>
  );
}
