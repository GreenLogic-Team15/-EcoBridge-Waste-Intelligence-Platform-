import React, { useState } from "react";
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
  MapPin,
} from "lucide-react";

const PartnerHomepage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "log_waste", label: "Log waste", icon: LogOut },
    { id: "pickup_requests", label: "Pickup requests", icon: Truck },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const filters = [
    { id: "all", label: "All", count: 18, color: "bg-gray-500" },
    { id: "organic", label: "Organic", count: null, color: "bg-green-500" },
    {
      id: "inorganic",
      label: "Inorganic",
      count: null,
      color: "bg-yellow-500",
    },
    { id: "nearby", label: "Nearby", count: null, color: "bg-teal-500" },
    { id: "urgent", label: "Urgent", count: null, color: "bg-red-500" },
    { id: "packaging", label: "Packaging", count: null, color: "bg-blue-500" },
  ];

  const wasteListings = [
    {
      id: 1,
      title: "Leftover Soaps 100kg",
      status: "Urgent",
      statusColor: "bg-orange-100 text-orange-700",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      id: 2,
      title: "Orange Peels 20kg",
      status: "New",
      statusColor: "bg-green-100 text-green-700",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      id: 3,
      title: "Orange Peels 20kg",
      status: "New",
      statusColor: "bg-green-100 text-green-700",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      id: 4,
      title: "Leftover Soaps 100kg",
      status: "Urgent",
      statusColor: "bg-orange-100 text-orange-700",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      id: 5,
      title: "Leftover Soaps 100kg",
      status: "Urgent",
      statusColor: "bg-orange-100 text-orange-700",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      id: 6,
      title: "Orange Peels 20kg",
      status: "New",
      statusColor: "bg-green-100 text-green-700",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&q=80&w=150&h=150",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAF9]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 h-screen">
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-[#E8F5E9] text-[#2E5C47]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Sarah Anthony"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">
              Sarah Anthony
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Good Morning Suleiman
            </h1>
            <p className="text-gray-500">
              Discover available waste, connect with businesses, and manage
              pickup requests efficiently.
            </p>
          </div>
          <button className="flex items-center gap-2 text-[#2E5C47] font-medium text-sm">
            Dashboard
            <LayoutDashboard className="w-4 h-4" />
          </button>
        </div>

        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Available Waste Listings
          </h2>
          <p className="text-sm text-gray-500">
            Browse and request pickup for available waste material
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === filter.id
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {filter.label}
                {filter.count && (
                  <span
                    className={`w-5 h-5 rounded-full ${filter.color} text-white text-[10px] flex items-center justify-center`}
                  >
                    {filter.count}
                  </span>
                )}
                {!filter.count && filter.id !== "all" && (
                  <span
                    className={`w-2 h-2 rounded-full ${filter.color}`}
                  ></span>
                )}
              </button>
            ))}
            <button className="text-xs text-[#2E5C47] font-medium hover:underline ml-2">
              Clear filter
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex gap-6">
          {/* Waste Listings Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {wasteListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${listing.statusColor}`}
                      >
                        {listing.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-0.5">
                      {listing.pickupTime}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">
                      {listing.location}
                    </p>
                    <p className="text-[10px] text-gray-400 mb-2">
                      {listing.postedTime}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <button className="bg-[#4A7C59] hover:bg-[#3d6649] text-white text-xs px-4 py-1.5 rounded-md transition-colors">
                        Request Pickup
                      </button>
                      <div className="flex gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-[#2E5C47] hover:bg-gray-100 rounded">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-[#2E5C47] hover:bg-gray-100 rounded">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 mt-2">
                      {listing.contact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="w-80 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="h-full min-h-[500px] bg-[#E8F5E9] relative">
              {/* Placeholder Map - Replace with actual Google Maps or Mapbox */}
              <img
                src="https://maps.googleapis.com/maps/api/staticmap?center=Abuja,Nigeria&zoom=12&size=400x600&maptype=roadmap&style=feature:all|saturation:-100|gamma:0.8&key=AIzaSyDv5rdGTve7JByYBVzK7cOCZzHnCi21dQc"
                alt="Map"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to styled div if no API key
                  e.target.style.display = "none";
                }}
              />

              {/* Fallback Map UI */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                <MapPin className="w-12 h-12 mb-2 text-[#2E5C47]" />
                <p className="text-sm font-medium">Abuja, Nigeria</p>
                <p className="text-xs">Map view</p>
              </div>

              {/* Map Markers (decorative) */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/3">
                <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Google Logo */}
              <div className="absolute bottom-2 left-2">
                <span className="text-xs text-gray-500 font-medium">
                  Google
                </span>
              </div>
              <div className="absolute bottom-2 right-2">
                <span className="text-[10px] text-gray-400">
                  Map data ©2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerHomepage;
