import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const nav = useNavigate();

  const goLogin = () => {
    nav("/login");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">

        {/* Main Card */}
        <div className="text-center bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Business Book Directory
          </h1>

          <p className="text-gray-600 mb-8 text-lg">
            Your smart platform to explore, manage and access books across business shops.
          </p>

          <button
            onClick={goLogin}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
          >
            Search Books
          </button>

          <p className="mt-4 text-gray-500 text-sm">
            Click search to continue — login required
          </p>
        </div>

        {/* --- NEW FEATURES SECTION --- */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">

          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">🔍 Smart Search</h3>
            <p className="text-gray-600 text-sm">
              Quickly search books across multiple business shops with accurate results.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">🏬 Shop Directory</h3>
            <p className="text-gray-600 text-sm">
              Browse through organized shop profiles and explore available collections.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">📚 Easy Management</h3>
            <p className="text-gray-600 text-sm">
              Manage book inventories with a simple and user-friendly interface.
            </p>
          </div>

        </div>
        {/* END FEATURES */}
      </div>
    </>
  );
};

export default Home;
