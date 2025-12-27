import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Adminhome from "./pages/adminhome";
import Add from "./pages/add";
import List from "./pages/list";
import Orders from "./pages/orders";
import Edit from "./pages/edit";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Backend URL
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  // ✅ Load token from localStorage
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Toasts available everywhere */}
      <ToastContainer position="top-right" autoClose={2000} />

      {token === "" ? (
        // 🔐 Login Screen
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />

          <div className="flex w-full">
            <Sidebar />

            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path= "/admin" element = {<Adminhome/>} />
                <Route path="/admin/add" element={<Add />} />
                <Route path="/admin/list" element={<List />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/edit/:id" element={<Edit />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
