import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClassName = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-emerald-600 text-white"
        : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
    }`;

  return (
    <nav className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold text-emerald-700">
          EcoBridge
        </div>
        <div className="flex items-center gap-2">
          <NavLink to="/" className={linkClassName} end>
            Onboarding
          </NavLink>
          <NavLink to="/login" className={linkClassName}>
            Login
          </NavLink>
          <NavLink to="/partner-homepage" className={linkClassName}>
            Partner Home
          </NavLink>
          <NavLink to="/admin-dashboard" className={linkClassName}>
            Admin Dashboard
          </NavLink>
          <NavLink to="/pickup-requests" className={linkClassName}>
            Pickup Requests
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

