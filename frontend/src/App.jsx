// import {
//   Routes,
//   Route,
//   Navigate
// } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";

// import AdminDashboard from "./pages/AdminDashboard";
// import OwnerDashboard from "./pages/OwnerDashboard";
// import Users from "./pages/Users";
// import Stores from "./pages/Stores";
// import AddUser from "./pages/AddUser";
// import AddStore from "./pages/AddStore";
// import StoreList from "./pages/StoreList";
// import ChangePassword from "./pages/ChangePassword";

// import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";

// function App() {

//   const token =
//     localStorage.getItem("token");

//   return (
//     <>
//       {token && <Navbar />}

//       <Routes>

//         {/* Public Routes */}

//         <Route
//           path="/"
//           element={<Navigate to="/login" />}
//         />

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         {/* Admin Routes */}

//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute role="ADMIN">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/users"
//           element={
//             <ProtectedRoute role="ADMIN">
//               <Users />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/stores"
//           element={
//             <ProtectedRoute role="ADMIN">
//               <Stores />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/add-user"
//           element={
//             <ProtectedRoute role="ADMIN">
//               <AddUser />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/add-store"
//           element={
//             <ProtectedRoute role="ADMIN">
//               <AddStore />
//             </ProtectedRoute>
//           }
//         />

//         {/* User Routes */}

//         <Route
//           path="/stores"
//           element={
//             <ProtectedRoute role="USER">
//               <StoreList />
//             </ProtectedRoute>
//           }
//         />

//         {/* Store Owner Routes */}

//         <Route
//           path="/owner/dashboard"
//           element={
//             <ProtectedRoute role="STORE_OWNER">
//               <OwnerDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Common Route */}

//         <Route
//           path="/change-password"
//           element={
//             <ProtectedRoute>
//               <ChangePassword />
//             </ProtectedRoute>
//           }
//         />
//         {/* Invalid Routes */}

//         <Route
//           path="*"
//           element={
//             <h2
//               style={{
//                 textAlign: "center",
//                 marginTop: "50px"
//               }}
//             >
//               404 - Page Not Found
//             </h2>
//           }
//         />

//       </Routes>
//     </>
//   );
// }

// export default App;




import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useContext } from "react";

import { AuthContext }
from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import Users from "./pages/Users";
import Stores from "./pages/Stores";
import AddUser from "./pages/AddUser";
import AddStore from "./pages/AddStore";
import StoreList from "./pages/StoreList";
import ChangePassword from "./pages/ChangePassword";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {

  const { token } =
    useContext(AuthContext);

  return (
    <>
      {token && <Navbar />}

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Admin Routes */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="ADMIN">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute role="ADMIN">
              <Stores />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-user"
          element={
            <ProtectedRoute role="ADMIN">
              <AddUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-store"
          element={
            <ProtectedRoute role="ADMIN">
              <AddStore />
            </ProtectedRoute>
          }
        />

        {/* User Routes */}

        <Route
          path="/stores"
          element={
            <ProtectedRoute role="USER">
              <StoreList />
            </ProtectedRoute>
          }
        />

        {/* Store Owner Routes */}

        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute role="STORE_OWNER">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Common Route */}

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* Invalid Routes */}

        <Route
          path="*"
          element={
            <h2
              style={{
                textAlign: "center",
                marginTop: "50px"
              }}
            >
              404 - Page Not Found
            </h2>
          }
        />

      </Routes>
    </>
  );
}

export default App;