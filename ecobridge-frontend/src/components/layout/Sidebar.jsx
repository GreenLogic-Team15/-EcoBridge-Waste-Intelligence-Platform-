import React from "react";
import SidebarItem from "../ui/SidebarItem";
import {
  LayoutDashboard,
  LogOut,
  Bell,
  Settings,
  History,
  Truck,
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, userType }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "log_waste", label: "Log Waste", icon: LogOut },
    { id: "pickup_req", label: "Pickup Requests", icon: Truck },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#2E5C47] rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white rounded-full" />
        </div>
        <span className="text-xl font-bold text-[#2E5C47] tracking-tight">
          EcoBridge
        </span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            {...item}
            active={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Sarah Anthony
            </p>
            <p className="text-xs text-gray-500 truncate">
              {userType === "admin" ? "Administrator" : "Partner"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
