import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    adminCode: "",
    imageUrl: "",
    // companyId நீக்கப்பட்டது
  });

  const [registering, setRegistering] = useState(false);
  const nav = useNavigate();

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setRegistering(true);
    try {
      const res = await api.post("/api/register", form);
      console.log(res.data);
      alert("Registered successfully");
      nav("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex justify-center items-center bg-gradient-to-br from-blue-100 to-purple-100">
        <form
          onSubmit={submit}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md relative"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Create Account
          </h2>

          {form.imageUrl && (
            <div className="flex justify-center mb-4">
              <img
                src={form.imageUrl}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-300"
              />
            </div>
          )}

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={change}
            required
            className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={change}
            required
            className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            name="password"
            type="password"
            placeholder="Password (min 6 chars)"
            value={form.password}
            onChange={change}
            required
            minLength={6}
            className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            name="imageUrl"
            placeholder="Profile Image URL"
            value={form.imageUrl}
            onChange={change}
            className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* ROLE SELECTION - Removed Company Option */}
          <div className="flex justify-center gap-6 mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                checked={form.role === "user"}
                onChange={change}
                className="accent-blue-600"
              />
              <span className="text-gray-700 font-medium">User</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === "admin"}
                onChange={change}
                className="accent-blue-600"
              />
              <span className="text-gray-700 font-medium">Admin</span>
            </label>
          </div>

          {/* ADMIN CODE INPUT */}
          {form.role === "admin" && (
            <input
              name="adminCode"
              placeholder="Admin Access Code"
              value={form.adminCode}
              onChange={change}
              required
              className="w-full p-3 mb-4 border border-red-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          )}

          {/* Company ID Input Removed */}

          <button
            type="submit"
            disabled={registering}
            className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition ${
              registering ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {registering ? "Registering..." : "Register"}
          </button>

          <p className="text-center mt-4 text-gray-500">
            Already have an account?
            <Link to="/login" className="text-blue-600 ml-1 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;