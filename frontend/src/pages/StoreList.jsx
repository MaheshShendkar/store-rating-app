// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import "./StoreList.css";
// function StoreList() {

//   const [stores, setStores] = useState([]);
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");

//   useEffect(() => {
//     fetchStores();
//   }, []);

//   const fetchStores = async () => {

//     try {

//       let url = "/stores?";

//       if (name) {
//         url += `name=${name}&`;
//       }

//       if (address) {
//         url += `address=${address}`;
//       }

//       const res = await API.get(url);

//       setStores(res.data);

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   const submitRating = async (storeId, rating) => {

//     try {

//       const res = await API.post(
//         "/ratings/submitrating",
//         {
//           storeId,
//           rating
//         }
//       );

//       alert(res.data.message);

//       fetchStores();

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   return (

//   <div className="store-list-container">

//     <h1 className="store-list-title">
//       Store Listings
//     </h1>

//     <div className="search-section">

//       <input
//         className="search-input"
//         placeholder="Search by Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         className="search-input"
//         placeholder="Search by Address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />

//       <button
//         className="search-btn"
//         onClick={fetchStores}
//       >
//         Search
//       </button>

//     </div>

//     <div className="table-wrapper">

//       <table className="store-table">

//         <thead>

//           <tr>

//             <th>Store Name</th>
//             <th>Address</th>
//             <th>Average Rating</th>
//             <th>Submit Rating</th>

//           </tr>

//         </thead>

//         <tbody>

//           {stores.length > 0 ? (

//             stores.map((store) => (

//               <tr key={store.id}>

//                 <td>{store.name}</td>

//                 <td>{store.address}</td>

//                 <td>
//                   <span className="rating-badge">
//                     ⭐ {store.averageRating || 0}
//                   </span>
//                 </td>

//                 <td>

//                   <select
//                     className="rating-select"
//                     onChange={(e) =>
//                       submitRating(
//                         store.id,
//                         e.target.value
//                       )
//                     }
//                   >

//                     <option>
//                       Rate Store
//                     </option>

//                     <option value="1">
//                       ⭐ 1
//                     </option>

//                     <option value="2">
//                       ⭐ 2
//                     </option>

//                     <option value="3">
//                       ⭐ 3
//                     </option>

//                     <option value="4">
//                       ⭐ 4
//                     </option>

//                     <option value="5">
//                       ⭐ 5
//                     </option>

//                   </select>

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

// export default StoreList;



import { useEffect, useState } from "react";
import API from "../api/axios";
import "./StoreList.css";

function StoreList() {

  const [stores, setStores] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
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

      const params = new URLSearchParams();

      if (filters.name) {
        params.append(
          "name",
          filters.name
        );
      }

      if (filters.address) {
        params.append(
          "address",
          filters.address
        );
      }

      const res = await API.get(
        `/stores?${params.toString()}`
      );

      setStores(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const clearFilters = () => {

    setFilters({
      name: "",
      address: ""
    });

    setTimeout(() => {
      fetchStores();
    }, 100);

  };

  const submitRating = async (
    storeId,
    rating
  ) => {

    try {

      const res = await API.post(
        "/ratings/submitrating",
        {
          storeId,
          rating
        }
      );

      alert(res.data.message);

      fetchStores();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="store-list-container">

      <h1 className="store-list-title">
        Store Listings
      </h1>

      {/* Filters */}

      <div className="search-section">

        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Search Store Name"
          className="search-input"
        />

        <input
          type="text"
          name="address"
          value={filters.address}
          onChange={handleChange}
          placeholder="Search Address"
          className="search-input"
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

      <div className="table-wrapper">

        <table className="store-table">

          <thead>

            <tr>

              <th>Store Name</th>
              <th>Address</th>
              <th>Average Rating</th>
              <th>Submit Rating</th>

            </tr>

          </thead>

          <tbody>

            {stores.length > 0 ? (

              stores.map((store) => (

                <tr key={store.id}>

                  <td>{store.name}</td>

                  <td>{store.address}</td>

                  <td>

                    <span className="rating-badge">
                      ⭐ {store.averageRating || 0}
                    </span>

                  </td>

                  <td>

                    <select
                      className="rating-select"
                      onChange={(e) =>
                        submitRating(
                          store.id,
                          e.target.value
                        )
                      }
                    >

                      <option>
                        Rate Store
                      </option>

                      <option value="1">
                        ⭐ 1
                      </option>

                      <option value="2">
                        ⭐ 2
                      </option>

                      <option value="3">
                        ⭐ 3
                      </option>

                      <option value="4">
                        ⭐ 4
                      </option>

                      <option value="5">
                        ⭐ 5
                      </option>

                    </select>

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

export default StoreList;