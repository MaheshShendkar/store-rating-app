// import { useEffect,
//          useState } from "react";

// import API from "../api/axios";
// import "./Stores.css";
// function Stores() {

//   const [stores,
//     setStores] = useState([]);

//   useEffect(() => {

//     fetchStores();

//   }, []);

//   const fetchStores =
//   async () => {

//     try {

//       const res =
//       await API.get(
//         "/admin/stores"
//       );

//       setStores(
//         res.data
//       );

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   return (

//   <div className="stores-container">

//     <h1 className="stores-title">
//       Store Management
//     </h1>

//     <div className="table-container">

//       <table className="stores-table">

//         <thead>

//           <tr>

//             <th>Store Name</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Average Rating</th>

//           </tr>

//         </thead>

//         <tbody>

//           {stores.length > 0 ? (

//             stores.map((store) => (

//               <tr key={store.id}>

//                 <td>{store.name}</td>

//                 <td>{store.email}</td>

//                 <td>{store.address}</td>

//                 <td>
//                   <span className="rating-badge">
//                     ⭐ {store.averageRating || 0}
//                   </span>
//                 </td>

//               </tr>

//             ))

//           ) : (

//             <tr>

//               <td
//                 colSpan="4"
//                 className="no-data"
//               >
//                 No Stores Found
//               </td>

//             </tr>

//           )}

//         </tbody>

//       </table>

//     </div>

//   </div>

// );
// }

// export default Stores;



import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Stores.css";

function Stores() {

  const [stores, setStores] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });

  };

  const fetchStores = async () => {

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

      const res =
        await API.get(
          `/admin/stores?${params.toString()}`
        );

      setStores(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const clearFilters = async () => {

    setFilters({
      name: "",
      email: "",
      address: ""
    });

    try {

      const res =
        await API.get(
          "/admin/stores"
        );

      setStores(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="stores-container">

      <h1 className="stores-title">
        Store Management
      </h1>

      {/* Filters */}

      <div className="filter-container">

        <input
          type="text"
          name="name"
          placeholder="Search Store Name"
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

        <button
          className="search-btn"
          onClick={fetchStores}
        >
          Search
        </button>

        <button
          className="clear-btn"
          onClick={clearFilters}
        >
          Clear
        </button>

      </div>

      <div className="table-container">

        <table className="stores-table">

          <thead>

            <tr>

              <th>Store Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Average Rating</th>

            </tr>

          </thead>

          <tbody>

            {stores.length > 0 ? (

              stores.map((store) => (

                <tr key={store.id}>

                  <td>{store.name}</td>

                  <td>{store.email}</td>

                  <td>{store.address}</td>

                  <td>

                    <span className="rating-badge">
                      ⭐ {store.averageRating || 0}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="no-data"
                >
                  No Stores Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Stores;