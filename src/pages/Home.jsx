import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ShopList from "./ShopList";

const Home = () => {
  const nav = useNavigate();

  const goLogin = () => {
    nav("/login");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* --- MODERN HERO SECTION --- */}
        <div className="relative bg-slate-900 pt-20 pb-32 sm:pb-40 overflow-hidden">
          {/* Background Decorative Blobs */}
          <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6 backdrop-blur-sm">
              ✨ The #1 Marketplace for Business Books
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Discover Knowledge <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Grow Your Business
              </span>
            </h1>

            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300 mb-10">
              Access a premium directory of business shops and book inventories.
              Manage, search, and explore efficiently.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={goLogin}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-lg font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("directory")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300"
              >
                Browse Directory
              </button>
            </div>
          </div>
        </div>

        {/* --- DIRECTORY SECTION --- */}
        <div
          id="directory"
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 mb-24"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Card Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 text-xl">
                  📚
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Public Directory
                  </h2>
                  <p className="text-sm text-gray-500">
                    Live inventory from registered shops
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-green-600">
                  System Online
                </span>
              </div>
            </div>

            {/* List & Login Prompt Area */}
            <div className="p-6 bg-gray-50/50 min-h-[500px] flex flex-col">
              {/* The Directory List */}
              <ShopList />

              {/* --- NEW: LOGIN PROMPT AT BOTTOM --- */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-8 text-center shadow-sm">
                  <div className="mb-3 text-3xl">🔒</div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    Want to see more details?
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-md mx-auto">
                    Login now to view exclusive pricing, contact information,
                    and full inventory details.
                  </p>
                  <button
                    onClick={goLogin}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Login to Unlock Access →
                  </button>
                </div>
              </div>
              {/* ----------------------------------- */}
            </div>
          </div>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why choose us?</h2>
            <p className="text-gray-500 mt-2">
              Powerful features to manage your business reading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                🔍
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Smart Search
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Instantly filter through thousands of books across multiple
                vendors using our optimized algorithm.
              </p>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                🏬
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Multi-Vendor
              </h3>
              <p className="text-gray-500 leading-relaxed">
                A unified platform connecting book buyers directly with
                specialized business book shops.
              </p>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Fast & Secure
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Built on modern tech stacks ensuring lightning fast data
                retrieval and secure transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
