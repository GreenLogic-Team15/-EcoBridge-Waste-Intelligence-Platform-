import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Bell,
  Settings,
  History,
  Truck,
} from "lucide-react";

const Sidebar = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define menu items based on user type
  const getMenuItems = () => {
    const commonItems = [
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "history", label: "History", icon: History },
      { id: "settings", label: "Settings", icon: Settings },
    ];

    switch (userType) {
      case "partner":
        return [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            path: "/partner-homepage",
          },
          {
            id: "log_waste",
            label: "Log waste",
            icon: LogOut,
            path: "/waste-logging",
          },
          {
            id: "pickup_requests",
            label: "Pickup requests",
            icon: Truck,
            path: "/request-pickup",
          },
          ...commonItems.map((item) => ({
            ...item,
            path:
              item.id === "notifications"
                ? "/notifications"
                : item.id === "history"
                  ? "/history"
                  : "/settings",
          })),
        ];

      case "business":
        return [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            path: "/pickup-requests",
          },
          {
            id: "log_waste",
            label: "Log waste",
            icon: LogOut,
            path: "/waste-logging",
          },
          {
            id: "pickup_requests",
            label: "Pickup requests",
            icon: Truck,
            path: "/request-pickup",
          },
          ...commonItems.map((item) => ({
            ...item,
            path:
              item.id === "notifications"
                ? "/notifications"
                : item.id === "history"
                  ? "/history"
                  : "/settings",
          })),
        ];

      case "admin":
        return [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            path: "/admin-dashboard",
          },
          {
            id: "log_waste",
            label: "Log waste",
            icon: LogOut,
            path: "/waste-logging",
          },
          {
            id: "pickup_requests",
            label: "Pickup requests",
            icon: Truck,
            path: "/request-pickup",
          },
          ...commonItems.map((item) => ({
            ...item,
            path:
              item.id === "notifications"
                ? "/notifications"
                : item.id === "history"
                  ? "/history"
                  : "/settings",
          })),
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();
  const currentPath = location.pathname;

  return (
    <div className="w-56 bg-[#E8F5E9] flex flex-col fixed left-0 top-0 h-screen z-10">
      <nav className="flex-1 px-3 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                isActive
                  ? "bg-[#2E5C47] text-white"
                  : "text-gray-600 hover:bg-[#D1E7DD]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="Sarah Anthony"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700">
            Sarah Anthony
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
