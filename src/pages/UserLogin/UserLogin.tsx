import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserLogin.scss";
import useSnackbar from "../../hooks/useSnackbar";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { login } from "../../redux/thunks/UserAuthServices";
import { loginSchema } from "../../validation/authSchema";

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setErrors({});

      const result = loginSchema.safeParse({ email, password });

      if (!result.success) {
        const newErrors: typeof errors = {};
        result.error.issues.forEach((issue) => {
          newErrors[issue.path[0] as keyof typeof errors] = issue.message;
        });
        setErrors(newErrors);
        showSnackbar(
          newErrors[Object.keys(newErrors)[0] as keyof typeof errors] as string,
          "error"
        );
        return;
      }

      setIsLoading(true);
      const response = await dispatch(login({ email, password })).unwrap();
      if (response.success) {
        navigate("/dashboard");
        resetForm();
      }
    } catch (error: any) {
      showSnackbar(error.message || "Invalid credentials", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-heading">
        <h1>do-it.</h1>
      </div>
      <div className="user-login-card">
        <h2 className="user-login-title">Login</h2>
        <form onSubmit={handleSubmit} className="user-login-form">
          <div className="user-login-form-group">
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "user-login-input-error" : ""}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className={email ? "user-login-label-filled" : ""}
            >
              Email
            </label>
          </div>
          <div className="user-login-form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "user-login-input-error" : ""}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className={password ? "user-login-label-filled" : ""}
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="user-login-button"
            disabled={isLoading}
          >
            {isLoading ? <span className="user-login-spinner"></span> : "Login"}
          </button>
        </form>
        <p className="user-login-signup-link">
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </div>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={hideSnackbar}
      />
    </div>
  );
};

export default UserLogin;
