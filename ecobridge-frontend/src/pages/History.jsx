import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Calendar, ChevronDown, Download } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";

const History = () => {
  const navigate = useNavigate();
  const [userType] = useState("admin"); // Get from context/props in real app
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState("Last 30 days");

  // Sample history data
  const historyData = [
    {
      id: 1,
      date: "2026-02-20",
      time: "14:30",
      activity: "Waste Logged",
      details: "Organic Waste - 50kg",
      status: "Completed",
      location: "EcoFarms #0022",
      type: "waste",
    },
    {
      id: 2,
      date: "2026-02-19",
      time: "10:15",
      activity: "Pickup Requested",
      details: "Plastic Bottles - 20kg",
      status: "Completed",
      location: "Berg Jeans #0022",
      type: "pickup",
    },
    {
      id: 3,
      date: "2026-02-18",
      time: "16:45",
      activity: "Waste Logged",
      details: "Leftover Soaps - 100kg",
      status: "Pending",
      location: "Babajide & Co. #0022",
      type: "waste",
    },
    {
      id: 4,
      date: "2026-02-17",
      time: "09:00",
      activity: "Pickup Completed",
      details: "Orange Peels - 20kg",
      status: "Completed",
      location: "EcoFarms #0022",
      type: "pickup",
    },
    {
      id: 5,
      date: "2026-02-16",
      time: "13:20",
      activity: "Waste Logged",
      details: "Aluminium Cans - 15kg",
      status: "Cancelled",
      location: "AJ Steel Collectors #0026",
      type: "waste",
    },
    {
      id: 6,
      date: "2026-02-15",
      time: "11:00",
      activity: "Profile Updated",
      details: "Changed pickup address",
      status: "Completed",
      location: "-",
      type: "system",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "waste":
        return "🗑️";
      case "pickup":
        return "🚛";
      case "system":
        return "⚙️";
      default:
        return "📋";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F6]">
      <Sidebar userType={userType} />

      <div className="flex-1 ml-56 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Activity History
            </h1>
            <p className="text-sm text-gray-500">
              View and track all your past activities and transactions
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4A7C59] text-white text-sm rounded-lg hover:bg-[#3d6649]">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Date Range Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#F0F5F2] rounded-lg text-sm text-gray-700"
                >
                  <Calendar className="w-4 h-4" />
                  {dateRange}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {filterOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                    {[
                      "Today",
                      "Last 7 days",
                      "Last 30 days",
                      "Last 3 months",
                      "Custom range",
                    ].map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setDateRange(range);
                          setFilterOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#F0F5F2]"
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Activity Type Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select className="bg-[#F0F5F2] border-0 rounded-lg py-2 px-3 text-sm text-gray-700 focus:outline-none">
                  <option>All Activities</option>
                  <option>Waste Logged</option>
                  <option>Pickup Requests</option>
                  <option>System Updates</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search history..."
                className="w-64 pl-10 pr-4 py-2 bg-[#F0F5F2] border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Total Activities",
              value: "156",
              change: "+12 this month",
            },
            { label: "Waste Logged", value: "89", change: "2,450 kg total" },
            {
              label: "Pickups Completed",
              value: "45",
              change: "98% success rate",
            },
            {
              label: "Pending Actions",
              value: "3",
              change: "Requires attention",
            },
          ].map((stat, index) => (
            <div key={index} className="bg-[#E8F5E9] rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-green-600">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* History Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F5F0]">
                <th className="text-left text-xs font-medium text-gray-600 py-3 px-4">
                  Date & Time
                </th>
                <th className="text-left text-xs font-medium text-gray-600 py-3 px-4">
                  Activity
                </th>
                <th className="text-left text-xs font-medium text-gray-600 py-3 px-4">
                  Details
                </th>
                <th className="text-left text-xs font-medium text-gray-600 py-3 px-4">
                  Location
                </th>
                <th className="text-left text-xs font-medium text-gray-600 py-3 px-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-600 py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{item.date}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span>{getActivityIcon(item.type)}</span>
                      <span className="text-sm text-gray-900">
                        {item.activity}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {item.details}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {item.location}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-xs text-[#2E5C47] hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">Showing 1-6 of 156 activities</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-[#2E5C47] text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              2
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              3
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
