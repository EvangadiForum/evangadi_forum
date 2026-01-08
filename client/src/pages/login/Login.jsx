import React, { useRef, useContext } from "react";
import axios from "../axiosConfig/AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppState);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please provide all the information required");
      return;
    }

    try {
      const response = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      const token = response.data.token;
      const userData = response.data.user;

      if (!token) {
        alert("Login failed: No token returned");
        return;
      }

      localStorage.setItem("token", token);
      setUser(userData);
      navigate("/");
    } catch (error) {
      alert("Something went wrong. Please try again!");
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <>
      <section style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input ref={emailDom} type="email" placeholder="Email" />
          </div>
          <br />
          <div>
            <label>Password:</label>
            <input ref={passwordDom} type="password" placeholder="Password" />
          </div>
          <br />
          <button type="submit">Login</button>
        </form>
        <br />
        <Link to="/register">Register</Link>
      </section>
    </>
  );
}

export default Login;
