import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import ShopList from "./ShopList";
import CompanyDashboard from "./CompanyDashboard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showShops, setShowShops] = useState(false); // Note: Original logic seemed to show list when this is false
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open looks better on desktop

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

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  // --- COMPANY DASHBOARD ---
  if (user.role === "company") {
    return <CompanyDashboard user={user} />;
  }

  // --- USER DASHBOARD (Modern SaaS Layout) ---
  if (user.role === "user") {
    return (
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        
        {/* SIDEBAR */}
        <div
          className={`${
            sidebarOpen ? "w-72" : "w-20"
          } bg-slate-900 text-white shadow-2xl transition-all duration-300 relative flex flex-col z-20`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-6 -right-3 bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-400 transition transform hover:scale-110 z-50"
          >
            {sidebarOpen ? "‹" : "›"}
          </button>

          {/* Sidebar Content */}
          <div className="flex flex-col items-center mt-10 px-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={user.imageUrl || "https://via.placeholder.com/100"}
                alt="User"
                className="relative w-16 h-16 rounded-full border-2 border-slate-700 object-cover"
              />
            </div>

            {sidebarOpen && (
              <div className="mt-4 text-center animate-fade-in">
                <h1 className="text-lg font-bold text-slate-100 tracking-wide">
                  {user.name}
                </h1>
                <span className="inline-block mt-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30 uppercase tracking-wider font-semibold">
                  {user.role}
                </span>
              </div>
            )}
          </div>

          {/* Navigation Links (Dummy links for visual structure) */}
          <div className="mt-10 flex-1 w-full px-3 space-y-2">
            <div className="flex items-center p-3 bg-indigo-600 rounded-xl cursor-pointer shadow-md shadow-indigo-900/20">
              <span className="text-xl">🛍️</span>
              {sidebarOpen && <span className="ml-3 font-medium">Browse Shops</span>}
            </div>
            {/* Add more sidebar items here if needed */}
          </div>
          
          <div className="p-4 border-t border-slate-800">
            
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col h-full relative overflow-hidden">
          {/* Top Header Bar */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
             <h2 className="text-xl font-bold text-slate-800">Dashboard Overview</h2>
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">🔔</div>
             </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
            {showShops ? (
              <div className="flex flex-col justify-center items-center h-full text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-slate-400 text-xl font-medium">
                  Your view is currently empty.
                </h2>
                <button 
                  onClick={() => setShowShops(false)}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  View Directory
                </button>
              </div>
            ) : (
              // Floating Card for Shop List
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[calc(100vh-140px)]">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-bold text-slate-700">Available Directories</h3>
                </div>
                <div className="p-6">
                   <ShopList />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  // --- ADMIN DASHBOARD (Glassmorphism Dark Theme) ---
  const userArr = Array.isArray(user)
    ? user.filter((u) => u._id === localStorage.getItem("id"))
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden px-4">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl text-center transform transition hover:scale-[1.01]">
          
          <h1 className="text-3xl font-bold mb-8 text-white tracking-tight">
            Admin Portal
          </h1>

          {userArr.length > 0 ? (
            <div className="space-y-6">
              {userArr.map((user) => (
                <div
                  key={user._id}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center hover:bg-white/10 transition duration-300"
                >
                  <div className="relative mb-4">
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur opacity-40"></div>
                    <img
                      src={user.imageUrl || "https://via.placeholder.com/100"}
                      alt="Admin"
                      className="relative w-24 h-24 rounded-full object-cover border-2 border-white/20"
                    />
                  </div>
                  
                  <p className="text-xl font-semibold text-white">{user.name}</p>
                  <div className="mt-2 px-4 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium">
                    Role: {user.role}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-400">No user profile found.</p>
          )}

          <div className="mt-8">
            <Link to="/admin">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                Enter Admin Panel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;