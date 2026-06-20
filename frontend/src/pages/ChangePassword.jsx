import { useState } from "react";
import API from "../api/axios";
import "./ChangePassword.css";

function ChangePassword() {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.put(
        "/users/change-password",
        formData
      );

      alert(res.data.message);

      setFormData({
        currentPassword: "",
        newPassword: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="change-password-page">

      <div className="change-password-card">

        <h2 className="change-password-title">
          Change Password
        </h2>

        <p className="change-password-subtitle">
          Update your account password
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="password-input"
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="password-input"
            required
          />

          <button
            type="submit"
            className="password-btn"
            disabled={loading}
          >
            {
              loading
                ? "Updating..."
                : "Update Password"
            }
          </button>

        </form>

      </div>

    </div>

  );
}

export default ChangePassword;