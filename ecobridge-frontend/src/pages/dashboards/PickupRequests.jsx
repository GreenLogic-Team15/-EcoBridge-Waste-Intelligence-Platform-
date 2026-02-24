import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Bell,
  Settings,
  History,
  Truck,
  Search,
  Phone,
  MessageSquare,
  User,
  CheckCircle,
  Calendar,
} from "lucide-react";

const PickupRequests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pickup_requests");
  const [activeFilter, setActiveFilter] = useState("all");

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "log_waste", label: "Log waste", icon: LogOut },
    { id: "pickup_requests", label: "Pickup requests", icon: Truck },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const stats = [
    {
      icon: "check",
      count: "4 Active Requests",
      subtext: "2 Pending, 1 En route, 1 Scheduled",
      color: "bg-[#A8D5BA]",
    },
    {
      icon: "check",
      count: "12 Completed Pickups",
      subtext: "View History",
      color: "bg-[#7CB87C]",
    },
  ];

  const filters = [
    { id: "all", label: "All", count: 18, color: "bg-gray-400" },
    { id: "pending", label: "Pending", color: "bg-red-500" },
    { id: "scheduled", label: "Scheduled", color: "bg-yellow-500" },
    { id: "enroute", label: "Enroute", color: "bg-teal-500" },
    { id: "completed", label: "Completed", color: "bg-green-600" },
    { id: "cancelled", label: "Cancelled", color: "bg-gray-400" },
  ];

  const requests = [
    {
      id: 1,
      status: "Enroute",
      statusColor: "bg-[#7CB87C]",
      title: "Orange Peels",
      date: "February 16, 2:00 pm",
      location: "EcoFarms #0022",
      updated: "Updated 15 minutes ago",
      driver: "David from EcoFarms en route",
      progress: 60,
      image:
        "https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      id: 2,
      status: "Scheduled",
      statusColor: "bg-red-500",
      title: "Left-over Soaps",
      date: "February 20, 2:00 pm",
      location: "Babajide & Co. #0022",
      updated: "Updated 2 days ago",
      progress: 30,
      image:
        "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      id: 3,
      status: "Completed",
      statusColor: "bg-[#7CB87C]",
      title: "Plastic Bottles",
      date: "February 8, 2:00 pm",
      location: "Berg Jeans #0022",
      updated: "Updated 8 days ago",
      progress: 100,
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      id: 4,
      status: "Canceled",
      statusColor: "bg-gray-400",
      title: "Aluminium cans",
      date: "February 16, 8:00 am",
      location: "AJ Steel Collectors #0026",
      updated: "Updated 7 hours ago",
      progress: 0,
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=120&h=120",
    },
  ];

  const handleClose = () => {
    // Close button action
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F6]">
      {/* Sidebar */}
      <div className="w-56 bg-[#E8F5E9] flex flex-col fixed left-0 top-0 h-screen">
        <nav className="flex-1 px-3 py-6 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === "pickup_requests") {
                    navigate("/pickup-requests");
                  } else if (item.id === "dashboard") {
                    navigate("/admin-dashboard");
                  } else if (item.id === "notifications") {
                    navigate("/notifications");
                  }
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
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Pickup Requests
            </h1>
            <p className="text-sm text-gray-500">
              Manage your waste requests and track their status
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            15 February 2026
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 flex items-center gap-4"
            >
              <div
                className={`w-14 h-14 ${stat.color} rounded-full flex items-center justify-center`}
              >
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {stat.count}
                </p>
                <p className="text-xs text-gray-500">{stat.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === filter.id
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                {filter.label}
                {filter.count && (
                  <span className="bg-gray-400 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {filter.count}
                  </span>
                )}
                {!filter.count && (
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${filter.color}`}
                  ></span>
                )}
              </button>
            ))}
            <button className="text-xs text-[#2E5C47] font-medium ml-2">
              Clear filter
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-40 pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded text-xs focus:outline-none"
            />
            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        {/* Request Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg p-4 border border-gray-100"
            >
              {/* Header with status and image */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-1 rounded text-white font-medium ${request.statusColor}`}
                  >
                    {request.status}
                  </span>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {request.title}
                  </h3>
                </div>
                <img
                  src={request.image}
                  alt={request.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>

              {/* Details */}
              <p className="text-sm text-gray-900 mb-1">{request.date}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                <User className="w-3 h-3" />
                <span>{request.location}</span>
              </div>
              <p className="text-[10px] text-gray-400 mb-3">
                {request.updated}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                <div
                  className="bg-[#7CB87C] h-1.5 rounded-full"
                  style={{ width: `${request.progress}%` }}
                ></div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600">
                  {request.driver || "View details"}
                </p>
                <div className="flex gap-2">
                  <button className="p-1.5 text-[#2E5C47] hover:bg-gray-100 rounded">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-[#2E5C47] hover:bg-gray-100 rounded">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-[#4A7C59] text-white text-sm rounded hover:bg-[#3d6649] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PickupRequests;
