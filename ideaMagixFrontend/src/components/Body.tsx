import React from "react";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="navbar bg-base-200 shadow-sm flex justify-center items-center">
        <span className="text-xl font-medium"> Ideamagix Assignment </span>
      </div>
      {/* content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      {/* Footer */}
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Ideamagix Assignment</p>
        </aside>
      </footer>
    </div>
  );
};

export default Body;
