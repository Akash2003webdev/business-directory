import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import ShopList from "./ShopList";
import CompanyDashboard from "./CompanyDashboard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showShops, setShowShops] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadUsers = async () => {
    try {
      const res = await api.get("/");
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  // COMPANY DASHBOARD
  if (user.role === "company") {
    return <CompanyDashboard user={user} />;
  }

  // USER DASHBOARD
  if (user.role === "user") {
    return (
      <div className="flex min-h-screen bg-gray-100 mt-6">

        {/* SIDEBAR */}
        <div
          className={`${
            sidebarOpen ? "w-72" : "w-20"
          } bg-white shadow-xl transition-all duration-300 p-5 relative flex flex-col items-center`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 right-[-16px] bg-indigo-600 text-white p-2 rounded-full shadow hover:bg-indigo-700"
          >
            {sidebarOpen ? "<" : ">"}
          </button>

          {/* Sidebar content */}
          {sidebarOpen ? (
            <div className="text-center mt-6">
              <img
                src={user.imageUrl || "https://via.placeholder.com/100"}
                alt="User"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover"
              />

              <h1 className="text-xl font-semibold mb-2 text-indigo-700">
                User Dashboard
              </h1>

              <p className="text-gray-600 mb-2">
                Welcome,{" "}
                <span className="font-medium text-blue-600">{user.name}</span>
              </p>

              <p className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md inline-block font-medium mb-4">
                Role: {user.role}
              </p>

             
            </div>
          ) : (
            <div className="flex flex-col items-center mt-10">
              <img
                src={user.imageUrl || "https://via.placeholder.com/100"}
                className="w-12 h-12 rounded-full border"
                alt="User"
              />
            </div>
          )}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6">
          {showShops ? (
            <div className="flex justify-center items-center h-full">
              <h2 className="text-gray-400 text-xl">
                Click "View Shop List" to see products →
              </h2>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-xl p-6 h-full overflow-auto">
              <ShopList />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  const userArr = Array.isArray(user)
    ? user.filter((u) => u._id === localStorage.getItem("id"))
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-blue-50 text-gray-800 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg text-center transform transition hover:-translate-y-1 hover:shadow-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-indigo-700">
          Admin Dashboard
        </h1>

        {userArr.length > 0 ? (
          <div className="space-y-4">
            {userArr.map((user) => (
              <div
                key={user._id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition flex flex-col items-center"
              >
                <img
                  src={user.imageUrl || "https://via.placeholder.com/100"}
                  alt="Admin"
                  className="w-24 h-24 rounded-full mb-3 object-cover border-4 border-blue-400 shadow"
                />
                <p className="text-lg font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500 font-medium">
                  Role: {user.role}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No user found</p>
        )}

        <div className="mt-6">
          <Link to="/admin">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
              Go to Admin Panel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
