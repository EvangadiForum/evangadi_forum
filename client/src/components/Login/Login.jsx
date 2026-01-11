import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../../Utility/axios";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email.trim()))
      newErrors.email = "Please enter a valid email";

    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await api.post("/api/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      alert(response.data.message || "Login successful!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        setApiError(
          error.response.data.message ||
            "Something went wrong. Please try again."
        );
      } else {
        setApiError("Network error — please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.login_container}>
      <div className={classes.login_card}>
        <h1>Login to your account</h1>

        {apiError && <div className={classes.api_error}>{apiError}</div>}

        <p className={classes.create_link}>
          Don't have an account? <Link to="/sign_up">Create a new account</Link>
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.form_group}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? classes.input_error : ""}
            />
            {errors.email && (
              <span className={classes.field_error}>{errors.email}</span>
            )}
          </div>

          <div className={`${classes.form_group} ${classes.password_group}`}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? classes.input_error : ""}
            />
            <button
              type="button"
              className={classes.password_toggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
            {errors.password && (
              <span className={classes.field_error}>{errors.password}</span>
            )}
          </div>

          <p className={classes.forgot_link}>
            <Link to="/forgot_password">Forgot password?</Link>
          </p>

          <button
            type="submit"
            className={classes.login_btn}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className={classes.mobile_create}>
            Don't have an account?{" "}
            <Link to="/sign_up">Create a new account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
