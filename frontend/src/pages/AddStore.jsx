import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AddStore.css";

function AddStore() {

  const [owners, setOwners] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: ""
  });

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {

    try {

      const res = await API.get(
        "/admin/users?role=STORE_OWNER"
      );

      setOwners(res.data);

    } catch (error) {

      console.log(error);

    }

  };

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
        "/admin/stores",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        address: "",
        owner_id: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (

    <div className="add-store-page">

      <div className="add-store-card">

        <h2 className="add-store-title">
          Add New Store
        </h2>

        <p className="add-store-subtitle">
          Create and assign a store owner
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Store Name"
            value={formData.name}
            onChange={handleChange}
            className="store-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Store Email"
            value={formData.email}
            onChange={handleChange}
            className="store-input"
          />

          <textarea
            name="address"
            placeholder="Store Address"
            value={formData.address}
            onChange={handleChange}
            className="store-input textarea"
            rows="4"
          />

          <select
            name="owner_id"
            value={formData.owner_id}
            onChange={handleChange}
            className="store-input"
          >
            <option value="">
              Select Store Owner
            </option>

            {owners.map((owner) => (
              <option
                key={owner.id}
                value={owner.id}
              >
                {owner.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="store-btn"
          >
            Add Store
          </button>

        </form>

      </div>

    </div>

  );
}

export default AddStore;