import { useState } from "react";
import API from "../api/axios";
import "./AddUser.css";

function AddUser() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER"
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
        "/admin/users",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER"
      });

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (

    <div className="add-user-page">

      <div className="add-user-card">

        <h2 className="add-user-title">
          Add New User
        </h2>

        <p className="add-user-subtitle">
          Create Admin, User, or Store Owner
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="user-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="user-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="user-input"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="user-input textarea"
            rows="4"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="user-input"
          >

            <option value="USER">
              USER
            </option>

            <option value="ADMIN">
              ADMIN
            </option>

            <option value="STORE_OWNER">
              STORE OWNER
            </option>

          </select>

          <button
            type="submit"
            className="user-btn"
          >
            Add User
          </button>

        </form>

      </div>

    </div>

  );
}

export default AddUser;