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
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row gap-4 p-4 text-gray-900">
        {/* LEFT SIDE – EQUAL SIZE PANEL */}
        <div className="flex-1 bg-white shadow-xl rounded-lg p-6 space-y-8 overflow-y-auto border border-gray-300">
          {/* 1️⃣ ADMIN SECTION */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-4 text-center underline decoration-blue-500">
              Admins
            </h2>

            {users.filter((u) => u.role === "admin").length > 0 ? (
              users
                .filter((u) => u.role === "admin")
                .map((user) => (
                  <div
                    key={user._id}
                    className="border-2 border-gray-300 rounded-md p-6 flex justify-between items-center mb-5 bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-6">
                      <img
                        src={
                          user.imageUrl ||
                          "https://randomuser.me/api/portraits/men/75.jpg"
                        }
                        className="w-14 h-14 rounded-full border-4 border-blue-600 object-cover"
                        alt="admin"
                      />
                      <div>
                        {/* Name Darker */}
                        <p className="text-xl font-bold text-gray-900">
                          {user.name}
                        </p>
                        {/* Role Darker */}
                        <p className="text-md text-gray-800 font-semibold">
                          {user.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => nav(`/edit/${user._id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md font-bold hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md font-bold hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-700 font-semibold">
                No admin accounts.
              </p>
            )}
          </div>

          <hr className="border-gray-400" />

          {/* 2️⃣ COMPANY SECTION */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-4 text-center underline decoration-green-500">
              Companies
            </h2>

            {users.filter((u) => u.role === "company").length > 0 ? (
              users
                .filter((u) => u.role === "company")
                .map((user) => (
                  <div
                    key={user._id}
                    className="border-2 border-gray-300 rounded-md p-4 flex justify-between items-center mb-3 bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          user.imageUrl ||
                          "https://randomuser.me/api/portraits/men/75.jpg"
                        }
                        className="w-14 h-14 rounded-full border-4 border-green-600 object-cover"
                        alt="company"
                      />
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-md text-gray-800 font-semibold">
                          {user.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => nav(`/edit/${user._id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md font-bold hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md font-bold hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-700 font-semibold">
                No companies found.
              </p>
            )}
          </div>

          <hr className="border-gray-400" />

          {/* 3️⃣ USERS SECTION */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-4 text-center underline decoration-purple-500">
              Users
            </h2>

            {users.filter((u) => u.role === "user").length > 0 ? (
              users
                .filter((u) => u.role === "user")
                .map((user) => (
                  <div
                    key={user._id}
                    className="border-2 border-gray-300 rounded-md p-4 flex justify-between items-center mb-3 bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          user.imageUrl ||
                          "https://randomuser.me/api/portraits/men/75.jpg"
                        }
                        className="w-14 h-14 rounded-full border-4 border-purple-600 object-cover"
                        alt="user"
                      />
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-md text-gray-800 font-semibold">
                          {user.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => nav(`/edit/${user._id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md font-bold hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md font-bold hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-700 font-semibold">
                No regular users found.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE – EQUAL SIZE PANEL */}
        <div className="flex-1 bg-white shadow-xl rounded-lg p-6 overflow-y-auto border border-gray-300">
          <h1 className="text-2xl font-bold text-center text-black mb-4 border-b-2 border-gray-200 pb-2">
            Business Directory
          </h1>

          <ShopandProduct />
        </div>
      </div>
    </>
  );
};

export default Admin;