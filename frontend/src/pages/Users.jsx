// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import "./Users.css";
// function Users() {

//   const [users, setUsers] =
//     useState([]);

//   useEffect(() => {

//     fetchUsers();

//   }, []);

//   const fetchUsers = async () => {

//     try {

//       const res =
//       await API.get(
//         "/admin/users"
//       );

//       setUsers(res.data);

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   return (

//   <div className="users-container">

//     <h1 className="users-title">
//       User Management
//     </h1>

//     <div className="table-container">

//       <table className="users-table">

//         <thead>

//           <tr>

//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Address</th>

//           </tr>

//         </thead>

//         <tbody>

//           {users.length > 0 ? (

//             users.map((user) => (

//               <tr key={user.id}>

//                 <td>{user.name}</td>

//                 <td>{user.email}</td>

//                 <td>

//                   <span
//                     className={`role-badge
//                     ${
//                       user.role === "ADMIN"
//                         ? "role-admin"
//                         : user.role === "STORE_OWNER"
//                         ? "role-owner"
//                         : "role-user"
//                     }`}
//                   >
//                     {user.role}
//                   </span>

//                 </td>

//                 <td>{user.address}</td>

//               </tr>

//             ))

//           ) : (

//             <tr>

//               <td
//                 colSpan="4"
//                 className="no-data"
//               >
//                 No Users Found
//               </td>

//             </tr>

//           )}

//         </tbody>

//       </table>

//     </div>

//   </div>

// );
// }

// export default Users;



import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Users.css";

function Users() {

  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: ""
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });

  };

  const fetchUsers = async () => {

    try {

      const params =
        new URLSearchParams();

      if (filters.name) {
        params.append(
          "name",
          filters.name
        );
      }

      if (filters.email) {
        params.append(
          "email",
          filters.email
        );
      }

      if (filters.address) {
        params.append(
          "address",
          filters.address
        );
      }

      if (filters.role) {
        params.append(
          "role",
          filters.role
        );
      }

      const res =
        await API.get(
          `/admin/users?${params.toString()}`
        );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const clearFilters = () => {

    setFilters({
      name: "",
      email: "",
      address: "",
      role: ""
    });

    setTimeout(() => {
      fetchUsers();
    }, 100);

  };

  return (

    <div className="users-container">

      <h1 className="users-title">
        User Management
      </h1>

      {/* Filters */}

      <div className="filter-container">

        <input
          type="text"
          name="name"
          placeholder="Search Name"
          value={filters.name}
          onChange={handleChange}
          className="filter-input"
        />

        <input
          type="text"
          name="email"
          placeholder="Search Email"
          value={filters.email}
          onChange={handleChange}
          className="filter-input"
        />

        <input
          type="text"
          name="address"
          placeholder="Search Address"
          value={filters.address}
          onChange={handleChange}
          className="filter-input"
        />

        <select
          name="role"
          value={filters.role}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">
            All Roles
          </option>

          <option value="ADMIN">
            ADMIN
          </option>

          <option value="USER">
            USER
          </option>

          <option value="STORE_OWNER">
            STORE OWNER
          </option>

        </select>

        <button
          onClick={fetchUsers}
          className="search-btn"
        >
          Search
        </button>

        <button
          onClick={clearFilters}
          className="clear-btn"
        >
          Clear
        </button>

      </div>

      <div className="table-container">

        <table className="users-table">

          <thead>

            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Address</th>

            </tr>

          </thead>

          <tbody>

            {users.length > 0 ? (

              users.map((user) => (

                <tr key={user.id}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>

                    <span
                      className={`role-badge
                      ${
                        user.role === "ADMIN"
                          ? "role-admin"
                          : user.role === "STORE_OWNER"
                          ? "role-owner"
                          : "role-user"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td>{user.address}</td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="no-data"
                >
                  No Users Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Users;