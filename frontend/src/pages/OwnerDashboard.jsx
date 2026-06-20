import { useEffect, useState } from "react";
import API from "../api/axios";
import "./OwnerDashboard.css";

function OwnerDashboard() {

  const [store, setStore] = useState({});
  const [ratings, setRatings] = useState([]);

  useEffect(() => {

    fetchDashboard();
    fetchRatings();

  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await API.get(
        "/owners/dashboard"
      );

      setStore(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchRatings = async () => {

    try {

      const res = await API.get(
        "/owners/ratings"
      );

      setRatings(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="owner-container">
     

      <h1 className="owner-title">
        Store Owner Dashboard
      </h1>

      <div className="owner-cards">

        <div className="owner-card">
          <h3>🏪 Store Name</h3>
          <p>{store.name}</p>
        </div>

        <div className="owner-card">
          <h3>⭐ Average Rating</h3>
          <p>{store.averageRating || 0}</p>
        </div>

        <div className="owner-card">
          <h3>📝 Total Ratings</h3>
          <p>{ratings.length}</p>
        </div>

      </div>

      <div className="ratings-section">

        <h2>
          Users Who Rated Your Store
        </h2>

        <table className="ratings-table">

          <thead>

            <tr>

              <th>User Name</th>
              <th>Email</th>
              <th>Rating</th>

            </tr>

          </thead>

          <tbody>

            {ratings.length > 0 ? (

              ratings.map((rating) => (

                <tr key={rating.id}>

                  <td>{rating.name}</td>

                  <td>{rating.email}</td>

                  <td>
                    ⭐ {rating.rating}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="3"
                  className="no-data"
                >
                  No Ratings Available
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default OwnerDashboard;