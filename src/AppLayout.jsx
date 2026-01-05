import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const AppLayout = () => {
  return (
    // Global App Container: Applies Dark Theme & Font Settings to the whole app
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Global Navigation 
        (Ensure you remove <Navbar /> from Home.js, Login.js etc. if used here)
      */}
      <Navbar />

      {/* Main Content Wrapper */}
      {/* We removed the hardcoded padding="30px" to allow full-width hero sections in Home/About pages */}
      <main className="relative w-full z-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
