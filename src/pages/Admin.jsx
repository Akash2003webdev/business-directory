import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ShopandProduct from "./ShopandProduct";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const nav = useNavigate();

  const loadUsers = async () => {
    try {
      const res = await api.get("/");
      setUsers(res.data);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    await api.delete(`/${id}`);
    confirm("User deleted");
    loadUsers();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row gap-4 p-4">
        {/* LEFT SIDE – EQUAL SIZE PANEL */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6 space-y-8 overflow-y-auto">
          {/* 1️⃣ ADMIN SECTION */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Admins
            </h2>

            {users.filter((u) => u.role === "admin").length > 0 ? (
              users
                .filter((u) => u.role === "admin")
                .map((user) => (
                  <div
                    key={user._id}
                    className="border border-gray-200 rounded-md p-9 flex justify-between items-center mb-5"
                  >
                    <div className="flex items-center gap-6">
                      <img
                        src={
                          user.imageUrl ||
                          "https://randomuser.me/api/portraits/men/75.jpg"
                        }
                        className="w-14 h-14 rounded-full border-2 border-blue-500 object-cover"
                        alt="admin"
                      />
                      <div>
                        <p className="text-lg font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => nav(`/edit/${user._id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">No admin accounts.</p>
            )}
          </div>

          {/* 2️⃣ COMPANY SECTION */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Companies
            </h2>

            {users.filter((u) => u.role === "company").length > 0 ? (
              users
                .filter((u) => u.role === "company")
                .map((user) => (
                  <div
                    key={user._id}
                    className="border border-gray-200 rounded-md p-4 flex justify-between items-center mb-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          user.imageUrl ||
                          "https://randomuser.me/api/portraits/men/75.jpg"
                        }
                        className="w-14 h-14 rounded-full border-2 border-green-500 object-cover"
                        alt="company"
                      />
                      <div>
                        <p className="text-lg font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => nav(`/edit/${user._id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">No companies found.</p>
            )}
          </div>

          {/* 3️⃣ USERS SECTION */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Users
            </h2>

            {users.filter((u) => u.role === "user").length > 0 ? (
              users
                .filter((u) => u.role === "user")
                .map((user) => (
                  <div
                    key={user._id}
                    className="border border-gray-200 rounded-md p-4 flex justify-between items-center mb-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          user.imageUrl ||
                          "https://randomuser.me/api/portraits/men/75.jpg"
                        }
                        className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover"
                        alt="user"
                      />
                      <div>
                        <p className="text-lg font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => nav(`/edit/${user._id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">
                No regular users found.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE – EQUAL SIZE PANEL */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Business Directory
          </h1>

          <ShopandProduct />
        </div>
      </div>
    </>
  );
};

export default Admin;
