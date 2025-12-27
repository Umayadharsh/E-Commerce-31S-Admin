import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const Login = ({ setToken }) => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/admin`,
        form
      );

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-light text-center mb-8 tracking-wide">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 text-sm rounded"
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-4 py-3 text-sm rounded"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-black text-white text-sm tracking-widest"
          >
            LOGIN
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Restricted access • Admin only
        </p>
      </div>
    </div>
  );
};

export default Login;

