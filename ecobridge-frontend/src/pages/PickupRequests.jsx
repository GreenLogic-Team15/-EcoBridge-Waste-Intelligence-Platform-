import React from "react";
import {
  Search,
  Filter,
  CheckCircle,
  Calendar,
  MapPin,
  Truck,
} from "lucide-react";
import { PICKUP_REQUESTS } from "../data/mockData";

const PickupRequests = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pickup Requests</h1>
          <p className="text-gray-500">
            Manage your waste requests and track their status.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2E5C47]"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Active Requests",
            value: "4",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Completed",
            value: "12",
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Pending",
            value: "2",
            color: "text-yellow-600",
            bg: "bg-yellow-50",
          },
          {
            label: "Cancelled",
            value: "1",
            color: "text-red-600",
            bg: "bg-red-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}
            >
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          "All",
          "Pending",
          "Scheduled",
          "Enroute",
          "Completed",
          "Cancelled",
        ].map((filter, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${i === 0 ? "bg-[#2E5C47] text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PICKUP_REQUESTS.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-40 overflow-hidden relative">
              <img
                src={req.image}
                alt={req.title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                  req.status === "Completed"
                    ? "bg-green-500 text-white"
                    : req.status === "Scheduled"
                      ? "bg-blue-500 text-white"
                      : "bg-yellow-500 text-white"
                }`}
              >
                {req.status}
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-semibold text-[#2E5C47] uppercase tracking-wider">
                    {req.type}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {req.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {req.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  {req.location}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                  View Details
                </button>
                <button className="p-2 text-gray-400 hover:text-[#2E5C47] bg-gray-50 rounded-lg">
                  <Truck className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickupRequests;
