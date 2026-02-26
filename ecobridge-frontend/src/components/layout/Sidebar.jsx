import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Bell,
  Settings,
  History,
  Truck,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/apiClient";
import { useSidebar } from "../../contexts/SidebarContext";

const Sidebar = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const {
    isMobile,
    isMobileOpen,
    setMobileOpen,
    isCollapsed,
    setCollapsed,
  } = useSidebar();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    api
      .get("/api/notifications/unread-count")
      .then((res) => {
        if (cancelled) return;
        const payload = res.data || {};
        const count =
          payload.unreadCount ?? payload.count ?? payload.total ?? 0;
        setUnreadCount(count);
      })
      .catch(() => {
        if (!cancelled) setUnreadCount(0);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const getMenuItems = () => {
    const notificationItem = {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      path: "/notifications",
    };
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
  const currentPath = location.pathname;

  const handleNav = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          const showBadge = item.id === "notifications" && unreadCount > 0;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                isActive
                  ? "bg-[#2E5C47] text-white"
                  : "text-gray-600 hover:bg-[#D1E7DD]"
              } ${isCollapsed && !isMobile ? "justify-center px-2" : ""}`}
              title={isCollapsed && !isMobile ? item.label : undefined}
            >
              <span className="relative flex-shrink-0">
                <Icon className="w-4 h-4" />
                {showBadge && (
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 px-0.5 rounded-full bg-red-500 text-[9px] leading-3 text-white flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </span>
              {(!isCollapsed || isMobile) && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-[#D1E7DD] px-3 py-4 space-y-1">
        {!isMobile && (
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="w-full flex items-center justify-center gap-2 py-2 text-gray-500 hover:text-[#2E5C47]"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
        <button
          type="button"
          onClick={() => handleNav("/settings")}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
            location.pathname === "/settings"
              ? "bg-[#2E5C47] text-white"
              : "text-gray-600 hover:bg-[#D1E7DD]"
          } ${isCollapsed && !isMobile ? "justify-center px-2" : ""}`}
          title={isCollapsed && !isMobile ? "Settings" : undefined}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {(!isCollapsed || isMobile) && <span className="text-sm font-medium">Settings</span>}
        </button>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/");
          }}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left text-gray-600 hover:bg-[#D1E7DD] hover:text-[#2E5C47] transition-colors ${isCollapsed && !isMobile ? "justify-center px-2" : ""}`}
          title={isCollapsed && !isMobile ? "Logout" : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {(!isCollapsed || isMobile) && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      <div className={`p-4 border-t border-[#D1E7DD] ${isCollapsed && !isMobile ? "flex justify-center" : ""}`}>
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="User"
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          {(!isCollapsed || isMobile) && (
            <span className="text-sm font-medium text-gray-700 truncate">Sarah Anthony</span>
          )}
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed left-3 top-3 z-40 p-2 rounded-lg bg-[#E8F5E9] text-gray-700 hover:bg-[#D1E7DD] lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        {isMobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-[#E8F5E9] flex flex-col z-50 shadow-xl lg:hidden">
              <div className="flex items-center justify-between p-4 border-b border-[#D1E7DD]">
                <span className="font-semibold text-gray-800">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#D1E7DD]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sidebarContent}
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <div
      className={`bg-[#E8F5E9] flex flex-col fixed left-0 top-0 h-screen z-30 transition-all duration-200 ${
        isCollapsed ? "w-14" : "w-56"
      }`}
    >
      {sidebarContent}
    </div>
  );
};

export default Sidebar;
