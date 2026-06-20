import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider }
from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <BrowserRouter>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </BrowserRouter>

);