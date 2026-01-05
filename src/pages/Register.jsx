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
    companyId: "",
    imageUrl: "",
  });

  const [registering, setRegistering] = useState(false); // ✅ New state

  const nav = useNavigate();

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setRegistering(true); // ✅ Start registering
    try {
      const res = await api.post("/api/register", form);
      console.log(res.data);
      alert("Registered successfully");

      // save values in localStorage based on role
      if (form.role === "company") {
        localStorage.setItem("companyId", form.companyId);
      }

      nav("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false); // ✅ Stop registering
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

          {/* ROLE SELECTION */}
          <div className="flex justify-around mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="user"
                checked={form.role === "user"}
                onChange={change}
                className="accent-blue-600"
              />
              <span>User</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === "admin"}
                onChange={change}
                className="accent-blue-600"
              />
              <span>Admin</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="company"
                checked={form.role === "company"}
                onChange={change}
                className="accent-blue-600"
              />
              <span>Company</span>
            </label>
          </div>

          {/* ADMIN CODE */}
          {form.role === "admin" && (
            <input
              name="adminCode"
              placeholder="Admin Access Code"
              value={form.adminCode}
              onChange={change}
              required
              className="w-full p-3 mb-4 border- border-red-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          )}

          {/* COMPANY ID */}
          {form.role === "company" && (
            <input
              name="companyId"
              placeholder="Enter Company ID"
              value={form.companyId}
              onChange={change}
              required
              className="w-full p-3 mb-4 border-2 border-green-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          )}

          <button
            type="submit"
            disabled={registering} // ✅ disable button while registering
            className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition ${
              registering ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {registering ? "Registering..." : "Register"} {/* ✅ show state */}
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
