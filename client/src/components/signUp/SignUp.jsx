import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from '../../pages/axiosConfig/AxiosConfig'
import classes from "./signup.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
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

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email.trim()))
      newErrors.email = "Please enter a valid email";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await api.post("/api/register", {
        username: formData.username.trim(),
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      alert(response.data.message || "User registered successfully!");
      navigate("/login");
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
    <div className={classes.signup_container}>
      <div className={classes.signup_card}>
        <h1>Join the network</h1>

        {apiError && <div className={classes.api_error}>{apiError}</div>}

        <p className={classes.signin_link}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.form_group}>
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? classes.input_error : ""}
            />
            {errors.username && (
              <span className={classes.field_error}>{errors.username}</span>
            )}
          </div>

          <div className={classes.form_row}>
            <div className={classes.form_group}>
              <input
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? classes.input_error : ""}
              />
              {errors.firstName && (
                <span className={classes.field_error}>{errors.firstName}</span>
              )}
            </div>

            <div className={classes.form_group}>
              <input
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? classes.input_error : ""}
              />
              {errors.lastName && (
                <span className={classes.field_error}>{errors.lastName}</span>
              )}
            </div>
          </div>

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

          <p className={classes.terms}>
            I agree to the <Link to="/privacy-policy">privacy policy</Link> and{" "}
            <Link to="/terms-of-service">terms of service</Link>.
          </p>

          <button
            type="submit"
            className={classes.signup_btn}
            disabled={loading}
          >
            {loading ? "Joining..." : "Agree and Join"}
          </button>

          <p className={classes.mobile_signin}>
            <Link to="/login">Already have an account?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
