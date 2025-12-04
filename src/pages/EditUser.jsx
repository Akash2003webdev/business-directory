import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const EditUser = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const res = await api.get(`/profile/${id}`);
      setForm(res.data);
      console.log(res.data);
    };
    getUser();
  }, [id]);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/${id}`, form);
    nav("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Edit User
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            placeholder="Enter name"
            name="name"
            value={form.name}
            onChange={change}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            placeholder="Enter image URL"
            name="imageUrl"
            value={form.imageUrl}
            onChange={change}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => nav("/admin")}
          className="w-full mt-3 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUser;
