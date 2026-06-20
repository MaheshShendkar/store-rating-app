  // import { useEffect, useState } from "react";
  // import API from "../api/axios";
  // import "./AdminDashboard.css";

  // function AdminDashboard() {

  //   const [stats, setStats] = useState({
  //     totalUsers: 0,
  //     totalStores: 0,
  //     totalRatings: 0
  //   });

  //   useEffect(() => {
  //     fetchDashboard();
  //   }, []);

  //   const fetchDashboard = async () => {

  //     try {

  //       const res = await API.get(
  //         "/admin/dashboard"
  //       );

  //       setStats(res.data);

  //     } catch (error) {

  //       console.log(error);

  //     }

  //   };

  //   return (

  //     <div className="dashboard-container">

  //       <h1 className="dashboard-title">
  //         Admin Dashboard
  //       </h1>

  //       <div className="stats-grid">

  //         <div className="stat-card">

  //           <h3>Total Users</h3>

  //           <p>
  //             {stats.totalUsers}
  //           </p>

  //         </div>

  //         <div className="stat-card">

  //           <h3>Total Stores</h3>

  //           <p>
  //             {stats.totalStores}
  //           </p>

  //         </div>

  //         <div className="stat-card">

  //           <h3>Total Ratings</h3>

  //           <p>
  //             {stats.totalRatings}
  //           </p>

  //         </div>

  //       </div>

  //     </div>

  //   );
  // }

  // export default AdminDashboard;


  //  new code 
  import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminDashboard.css";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const res =
        await API.get(
          "/admin/dashboard"
        );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="loading">
        Loading Dashboard...
      </div>

    );

  }

  return (

    <div className="dashboard-container">

      {/* Header */}

      <div className="dashboard-header">

        <h1 className="dashboard-title">
          Admin Dashboard
        </h1>

        <p className="dashboard-subtitle">
          Manage users, stores and ratings
        </p>

      </div>

      {/* Statistics Cards */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">
            👥
          </div>

          <h3>Total Users</h3>

          <p>
            {stats.totalUsers}
          </p>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            🏪
          </div>

          <h3>Total Stores</h3>

          <p>
            {stats.totalStores}
          </p>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            ⭐
          </div>

          <h3>Total Ratings</h3>

          <p>
            {stats.totalRatings}
          </p>

        </div>

      </div>

      {/* Quick Overview */}

      <div className="quick-actions">

        <h2>
          Quick Overview
        </h2>

        <div className="overview-box">

          <p>
            👥 Registered Users :
            <strong>
              {" "}
              {stats.totalUsers}
            </strong>
          </p>

          <p>
            🏪 Active Stores :
            <strong>
              {" "}
              {stats.totalStores}
            </strong>
          </p>

          <p>
            ⭐ Ratings Submitted :
            <strong>
              {" "}
              {stats.totalRatings}
            </strong>
          </p>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;