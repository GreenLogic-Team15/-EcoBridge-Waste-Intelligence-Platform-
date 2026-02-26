import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";

const Notifications = () => {
  const navigate = useNavigate();
  const { userType } = useAuth();

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
    const dashboardPath =
      userType === "partner"
        ? "/partner-homepage"
        : userType === "business"
          ? "/pickup-requests"
          : "/admin-dashboard";
    navigate(dashboardPath);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F6]">
      <Sidebar userType={userType || "admin"} />

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
