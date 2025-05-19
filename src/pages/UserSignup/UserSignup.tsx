import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserSignup.scss";
import useSnackbar from "../../hooks/useSnackbar";
import axiosInstance from "../../config/axiosInstance";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import { signupSchema } from "../../validation/authSchema";

const UserSignup: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const navigate = useNavigate();
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = signupSchema.safeParse({
      fullName,
      email,
      password,
      confirmPassword,
    });

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
    try {
      const userData = { name: fullName, email, password };
      const response = await axiosInstance.post("/signup", userData);
      if (response.data.success) {
        showSnackbar("Signup successful! Please log in.", "success");
        resetForm();
        navigate("/login");
      }
    } catch (error: any) {
      showSnackbar(
        error.response?.data?.message || "Signup failed. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-signup-container">
      <div className="user-signup-card">
        <h2 className="user-signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="user-signup-form">
          <div className="user-signup-form-group">
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={errors.fullName ? "user-signup-input-error" : ""}
              placeholder=" "
            />
            <label
              htmlFor="fullName"
              className={fullName ? "user-signup-label-filled" : ""}
            >
              Full Name
            </label>
          </div>
          <div className="user-signup-form-group">
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "user-signup-input-error" : ""}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className={email ? "user-signup-label-filled" : ""}
            >
              Email
            </label>
          </div>
          <div className="user-signup-form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "user-signup-input-error" : ""}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className={password ? "user-signup-label-filled" : ""}
            >
              Password
            </label>
          </div>
          <div className="user-signup-form-group">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={
                errors.confirmPassword ? "user-signup-input-error" : ""
              }
              placeholder=" "
            />
            <label
              htmlFor="confirmPassword"
              className={confirmPassword ? "user-signup-label-filled" : ""}
            >
              Confirm Password
            </label>
          </div>
          <button
            type="submit"
            className="user-signup-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="user-signup-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="user-signup-login-link">
          Already have an account? <Link to="/login">Login</Link>
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

export default UserSignup;
