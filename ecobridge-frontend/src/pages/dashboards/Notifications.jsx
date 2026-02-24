import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Bell,
  Settings,
  History,
  Truck,
} from "lucide-react";

const Notifications = () => {
  const navigate = useNavigate();

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "log_waste", label: "Log waste", icon: LogOut },
    { id: "pickup_requests", label: "Pickup requests", icon: Truck },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const notifications = [
    {
      id: 1,
      title: "Pickup Scheduled for Tomorrow",
      time: "31 Feb 15:00 pm",
      description: "Your waste pickup is scheduled for 9:00AM tomorrow",
      color: "bg-[#4A7C59]",
    },
    {
      id: 2,
      title: "Waste Segregation Reminder",
      time: "01 Mar 16:00 pm",
      description:
        "Please ensure proper segregation of recyclables and non-recyclables",
      color: "bg-yellow-400",
    },
    {
      id: 3,
      title: "Environmental Impact Notification",
      time: "31 Feb 15:30 pm",
      description: "Your waste pickup is scheduled for 9:00AM tomorrow",
      color: "bg-[#4A7C59]",
    },
    {
      id: 4,
      title: "System Maintenance Alert",
      time: "31 Feb 15:15 pm",
      description: "Scheduled maintenance tonight from 22:00 to 02:00",
      color: "bg-red-500",
    },
  ];

  const handleClose = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F6]">
      {/* Sidebar */}
      <div className="w-56 bg-[#E8F5E9] flex flex-col fixed left-0 top-0 h-screen">
        <nav className="flex-1 px-3 py-6 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === "notifications";
            return (
              <button
                key={item.id}
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

      {/* Main Content */}
      <div className="flex-1 ml-56 p-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Notifications
          </h1>

          <div className="bg-[#E8F5E9] rounded-lg overflow-hidden">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`p-4 flex items-start justify-between ${
                  index !== notifications.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">
                    {notification.time}
                  </p>
                  <p className="text-xs text-gray-600">
                    {notification.description}
                  </p>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${notification.color} flex-shrink-0 mt-1`}
                ></div>
              </div>
            ))}
          </div>

          {/* Close Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-[#4A7C59] text-white text-sm rounded hover:bg-[#3d6649] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
