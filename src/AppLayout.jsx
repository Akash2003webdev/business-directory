import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
const AppLayout = () => {
  return (
    <div>
      <Navbar />
     
      <main style={{ padding: "30px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
