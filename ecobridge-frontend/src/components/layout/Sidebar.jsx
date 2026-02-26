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
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // Define menu items based on user type
  const getMenuItems = () => {
    const notificationItem = { id: "notifications", label: "Notifications", icon: Bell, path: "/notifications" };
    const historyItem = { id: "history", label: "History", icon: History, path: "/history" };

    switch (userType) {
      case "partner":
        return [
          { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/partner-homepage" },
          { id: "log_waste", label: "Logging Waste", icon: LogOut, path: "/waste-logging" },
          { id: "pickup_requests", label: "Pickup request", icon: Truck, path: "/request-pickup" },
          notificationItem,
          historyItem,
        ];

      case "business":
        return [
          { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/pickup-requests" },
          { id: "log_waste", label: "Logging Waste", icon: LogOut, path: "/waste-logging" },
          { id: "pickup_requests", label: "Pickup request", icon: Truck, path: "/request-pickup" },
          notificationItem,
          historyItem,
        ];

      case "admin":
        return [
          { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
          { id: "log_waste", label: "Logging Waste", icon: LogOut, path: "/waste-logging" },
          { id: "pickup_requests", label: "Pickup request", icon: Truck, path: "/request-pickup" },
          notificationItem,
          historyItem,
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  // #region agent log
  fetch("http://127.0.0.1:7603/ingest/7184b5bb-95a1-4921-ae63-1dda68a88a88", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "286b84",
    },
    body: JSON.stringify({
      sessionId: "286b84",
      runId: "sidebar-pre-click",
      hypothesisId: "H1",
      location: "Sidebar.jsx:102",
      message: "Sidebar menu items computed",
      data: {
        userType,
        currentPath: location.pathname,
        menu: menuItems.map((item) => ({ id: item.id, path: item.path })),
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion agent log
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
              onClick={() => {
                // #region agent log
                fetch(
                  "http://127.0.0.1:7603/ingest/7184b5bb-95a1-4921-ae63-1dda68a88a88",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "X-Debug-Session-Id": "286b84",
                    },
                    body: JSON.stringify({
                      sessionId: "286b84",
                      runId: "sidebar-click",
                      hypothesisId: "H2",
                      location: "Sidebar.jsx:115",
                      message: "Sidebar item clicked",
                      data: {
                        userType,
                        currentPath: location.pathname,
                        targetId: item.id,
                        targetPath: item.path,
                      },
                      timestamp: Date.now(),
                    }),
                  },
                ).catch(() => {});
                // #endregion agent log

                navigate(item.path);
              }}
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

      {/* Bottom: Settings + Logout (consistent with Figma) */}
      <div className="mt-auto border-t border-[#D1E7DD] px-3 py-4 space-y-1">
        <button
          type="button"
          onClick={() => navigate("/settings")}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
            location.pathname === "/settings"
              ? "bg-[#2E5C47] text-white"
              : "text-gray-600 hover:bg-[#D1E7DD]"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left text-gray-600 hover:bg-[#D1E7DD] hover:text-[#2E5C47] transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="User"
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
