import React, { useState } from "react";
import {
  LayoutDashboard,
  LogOut,
  Bell,
  Settings,
  History,
  Truck,
  Search,
  Calendar,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "log_waste", label: "Log waste", icon: LogOut },
    { id: "pickup_requests", label: "Pickup requests", icon: Truck },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Stats data with circular progress
  const stats = [
    {
      label: "Total Waste Generated",
      value: "12,450",
      unit: "Kg",
      change: "+5.2% from last month",
      percentage: 75,
      color: "#4A7C59",
    },
    {
      label: "Waste Segregated",
      value: "8,750",
      unit: "Kg",
      change: "+8.1% from last month",
      percentage: 60,
      color: "#4A7C59",
    },
    {
      label: "Environmental Impact",
      value: "4,320",
      unit: "Kg CO2e",
      change: "+3.7% from last month",
      percentage: 45,
      color: "#4A7C59",
    },
    {
      label: "SDG 15 Alignment",
      value: "85",
      unit: "%",
      change: "+2.5% from last month",
      percentage: 85,
      color: "#4A7C59",
    },
  ];

  // Chart data
  const wasteData = [
    { month: "Feb", value: 100 },
    { month: "Mar", value: 120 },
    { month: "Apr", value: 80 },
    { month: "May", value: 40 },
    { month: "Jun", value: 60 },
    { month: "Jul", value: 20 },
  ];

  const segregationData = [
    { month: "Feb", value: 45 },
    { month: "Mar", value: 48 },
    { month: "Apr", value: 68 },
    { month: "May", value: 62 },
    { month: "Jun", value: 82 },
    { month: "Jul", value: 42 },
  ];

  // Recent activities
  const activities = [
    {
      user: "John Doe",
      activity: "Waste Entry",
      status: "Successful",
      date: "2026-02-30",
    },
    {
      user: "Rhoda O.",
      activity: "Pickup Request",
      status: "Successful",
      date: "2026-02-30",
    },
    {
      user: "Rebecca F.",
      activity: "Waste Entry",
      status: "Successful",
      date: "2026-02-30",
    },
    {
      user: "Bisola A.",
      activity: "Pickup Request",
      status: "Successful",
      date: "2026-02-30",
    },
  ];

  // Circular progress component
  const CircularProgress = ({ percentage, color }) => {
    const radius = 24;
    const stroke = 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-12 h-12">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="#E5E7EB"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
      </div>
    );
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
                  if (item.id === "notifications") {
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
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-1">
              Welcome Sarah
            </h1>
            <p className="text-sm text-gray-500">
              Admin Overview ~ February 2026
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            15 February 2026
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#E8F5E9] rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <CircularProgress
                  percentage={stat.percentage}
                  color={stat.color}
                />
              </div>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-500">{stat.unit}</span>
              </div>
              <p className="text-xs text-green-600">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Waste Generation Trends */}
          <div className="bg-[#E8F5E9] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Waste Generation Trends
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wasteData}>
                  <defs>
                    <linearGradient
                      id="wasteGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#C4A484" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#C4A484"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#D1E7DD"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#6B7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#6B7280" }}
                    ticks={[0, 25, 50, 100, 150]}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#C4A484"
                    fillOpacity={1}
                    fill="url(#wasteGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Segregation Performance */}
          <div className="bg-[#E8F5E9] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Segregation performance
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={segregationData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#D1E7DD"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#6B7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#6B7280" }}
                    ticks={[0, 20, 40, 60, 80]}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4A7C59" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Recent Activities
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder=""
                className="w-48 pl-9 pr-3 py-1.5 bg-gray-100 border-0 rounded text-xs focus:outline-none"
              />
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-600 py-2 px-3 bg-[#F5F5F0]">
                  User
                </th>
                <th className="text-left text-xs font-medium text-gray-600 py-2 px-3 bg-[#F5F5F0]">
                  Activity
                </th>
                <th className="text-left text-xs font-medium text-gray-600 py-2 px-3 bg-[#F5F5F0]">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-600 py-2 px-3 bg-[#F5F5F0]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="py-3 px-3 text-sm text-gray-900">
                    {activity.user}
                  </td>
                  <td className="py-3 px-3 text-sm text-gray-600">
                    {activity.activity}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                      {activity.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-sm text-gray-600">
                    {activity.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
