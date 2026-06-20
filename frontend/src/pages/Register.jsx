import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import "./Register.css";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/register",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        address: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (

    <div className="register-page">

      <div className="register-card">

        <div className="register-logo">
          ⭐ Store Rating App
        </div>

        <h2 className="register-title">
          Create Account
        </h2>

        <p className="register-subtitle">
          Register to continue
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="register-input"
            minLength="20"
            maxLength="60"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="register-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            minLength="8"
            maxLength="16"
          />

          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

        </form>

        <p className="auth-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>

  );
}

export default Register;