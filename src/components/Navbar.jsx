import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.clear();
    nav("/home");
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* --- FIXED GLASS NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* 1. BRAND LOGO (Gradient Text) */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-blue-500/50 transition">
                B
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Book<span className="text-blue-500">Dir</span>
              </span>
            </Link>

            {/* 2. DESKTOP MENU */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                to="/home"
                className="text-slate-300 hover:text-white font-medium transition duration-200 hover:scale-105"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-slate-300 hover:text-white font-medium transition duration-200 hover:scale-105"
              >
                About
              </Link>

              {/* AUTH BUTTONS */}
              {token ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 border border-red-500/50 text-red-400 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            {/* 3. MOBILE MENU BUTTON (Hamburger) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition"
              >
                {isMobileOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 4. MOBILE DROPDOWN MENU */}
        {isMobileOpen && (
          <div className="md:hidden bg-slate-900 border-t border-white/10 absolute w-full left-0 animate-fade-in-down shadow-2xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link
                to="/home"
                onClick={() => setIsMobileOpen(false)}
                className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileOpen(false)}
                className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition"
              >
                About
              </Link>

              <div className="pt-4 mt-2 border-t border-white/10">
                {token ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- SPACER DIV (This creates the gap below navbar) --- */}
      {/* h-24 means roughly 96px (approx 1 inch) */}
      <div className="h-24 bg-slate-900"></div>
    </>
  );
};

export default Navbar;
