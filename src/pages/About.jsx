import React from "react";
import Navbar from "../components/Navbar";
import flowImage from "../assets/flowchart.png"; // Ensure this image exists in your assets

const About = () => {
  return (
    <>
      {/* Background Animation Styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      <div className="min-h-screen bg-slate-900 relative overflow-hidden font-sans text-slate-200">
        <Navbar />

        {/* --- Background Ambient Glow --- */}
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {/* --- HERO HEADER --- */}
          <div className="text-center mb-20">
            <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm">
              System Architecture
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                BookDir
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed">
              A Scalable Multi-Vendor Application built to demonstrate robust
              Role-Based Access Control (RBAC) and seamless data integration
              between users and inventory databases.
            </p>
          </div>

          {/* --- SECTION 1: PROJECT OVERVIEW (Technical Focus) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">💻</span> Project Overview
              </h2>
              <p className="text-slate-400 leading-relaxed">
                This project is a Full-Stack implementation of a distributed
                directory system. It functions as a centralized hub where{" "}
                <strong>Company/Vendor</strong> accounts can perform CRUD
                (Create, Read, Update, Delete) operations on their inventory,
                while <strong>End Users</strong>
                get a read-only optimized view. It utilizes modern state
                management to handle data flow efficiently.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">⚡</span> Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "React.js (Vite)",
                  "Node.js & Express",
                  "Supabase (PostgreSQL)",
                  "Tailwind CSS",
                  "JWT Auth",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-slate-400 text-sm">
                Designed with a Microservices-ready architecture, ensuring high
                availability, secure API endpoints, and low-latency database
                queries.
              </p>
            </div>
          </div>

          {/* --- SECTION 2: AUTHENTICATION FLOW --- */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">
                🔐 Security & Logic Flow
              </h2>
              <p className="text-slate-400 mt-2">
                Technical breakdown of the Authentication System
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Left Side: The Steps */}
                <div className="lg:w-1/2 w-full">
                  <div className="space-y-6 relative border-l-2 border-slate-700 ml-3 pl-8 py-2">
                    {/* Step 1 */}
                    <div className="relative">
                      <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-blue-500 border-4 border-slate-900"></span>
                      <h3 className="text-xl font-bold text-white">
                        1. Client Request
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">
                        Client sends encrypted credentials (hashed payload) via
                        POST request to the API Gateway.
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative">
                      <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-indigo-500 border-4 border-slate-900"></span>
                      <h3 className="text-xl font-bold text-white">
                        2. Token Generation
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">
                        Server validates identity against the database. On
                        success, signs a <strong>JWT (JSON Web Token)</strong>.
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-slate-500">
                        <li className="flex items-center gap-2">
                          <span className="text-green-400">✔</span> Payload:
                          UserID, Role, Exp
                        </li>
                      </ul>
                    </div>

                    {/* Step 3 */}
                    <div className="relative">
                      <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-purple-500 border-4 border-slate-900"></span>
                      <h3 className="text-xl font-bold text-white">
                        3. Protected Routes
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">
                        React Router intercepts navigation. It decodes the token
                        role to grant access permissions.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center">
                          <span className="block text-red-400 font-bold text-xs uppercase">
                            Admin
                          </span>
                          <span className="text-xs text-slate-400">
                            CRUD Access
                          </span>
                        </div>
                        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center">
                          <span className="block text-green-400 font-bold text-xs uppercase">
                            Vendor
                          </span>
                          <span className="text-xs text-slate-400">
                            Write Access
                          </span>
                        </div>
                        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center">
                          <span className="block text-blue-400 font-bold text-xs uppercase">
                            User
                          </span>
                          <span className="text-xs text-slate-400">
                            Read Access
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative">
                      <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-slate-500 border-4 border-slate-900"></span>
                      <h3 className="text-xl font-bold text-white">
                        4. Session Termination
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">
                        Logout clears LocalStorage/Cookies and invalidates the
                        session state in the React Context.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Image Placeholder */}
                <div className="lg:w-1/2 w-full flex justify-center">
                  <div className="relative group w-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                      {/* Diagram Image */}
                      <img
                        src={flowImage}
                        alt="Authentication Flow Diagram"
                        className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition"
                      />
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-xs text-center text-slate-300">
                          System Data Flow Diagram
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- SECTION 3: KEY FEATURES --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Dynamic Querying",
                desc: "Optimized search algorithms for real-time filtering of large datasets.",
                icon: "🔍",
              },
              {
                title: "Data Integrity",
                desc: "Ensures atomic transactions and consistent state across all views.",
                icon: "🛡️",
              },
              {
                title: "Cross-Platform",
                desc: "Responsive design utilizing Grid and Flexbox for all viewports.",
                icon: "📱",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800 transition text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
