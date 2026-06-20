import { useState,
         useContext } from "react";

import API from "../api/axios";

import { AuthContext }
from "../context/AuthContext";
import "./Login.css";
import { useNavigate }
from "react-router-dom";

import {Link} from "react-router-dom";
function Login() {

  const navigate =
  useNavigate();

  const { login } =
  useContext(AuthContext);

  const [formData,
         setFormData] =
  useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });

  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const res =
      await API.post(
        "/auth/login",
        formData
      );

      login(
        res.data.token,
        res.data.role
      );

      if (
        res.data.role ===
        "ADMIN"
      ) {

        navigate(
          "/admin/dashboard"
        );

      }

      else if (
        res.data.role ===
        "STORE_OWNER"
      ) {

        navigate(
          "/owner/dashboard"
        );

      }

      else {

        navigate("/stores");

      }

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (
    
    
  <div className="login-page">

   
 
    <div className="login-card">
       <div className="login-logo">
  ⭐ Store Rating App
</div>
     
      <h2 className="login-title">
        Welcome Back
      </h2>

      <p className="login-subtitle">
        Login to your account
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="login-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="login-input"
        />

        <button
          type="submit"
          className="login-btn"
        >
          Login
        </button>

        <p className="auth-link">
  Don't have an account?
  <Link to="/register"> Register</Link>
</p>

      </form>

    </div>

  </div>
 
);
}

export default Login;