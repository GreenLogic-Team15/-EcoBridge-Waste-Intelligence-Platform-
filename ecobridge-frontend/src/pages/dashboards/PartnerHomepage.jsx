import React, { useState } from "react";
import { Search, Phone, MessageSquare, MapPin, User } from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";

const PartnerHomepage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { userType } = useAuth();

  const filters = [
    { id: "all", label: "All", count: 18 },
    { id: "organic", label: "Organic", count: 2, color: "bg-green-500" },
    { id: "inorganic", label: "Inorganic", count: 3, color: "bg-yellow-400" },
    { id: "nearby", label: "Nearby", count: 1, color: "bg-teal-400" },
    { id: "urgent", label: "Urgent", count: 9, color: "bg-red-500" },
    { id: "packaging", label: "Packaging", count: 1, color: "bg-blue-400" },
  ];

  const wasteListings = [
    {
      id: 1,
      title: "Leftover Soaps 100kg",
      status: "Urgent",
      statusColor: "bg-orange-400",
      wasteType: "Organic",
      wasteColor: "bg-green-500",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      id: 2,
      title: "Orange Peels 20kg",
      status: "New",
      statusColor: "bg-green-500",
      wasteType: "Organic",
      wasteColor: "bg-green-500",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      id: 3,
      title: "Orange Peels 20kg",
      status: "New",
      statusColor: "bg-green-500",
      wasteType: "Organic",
      wasteColor: "bg-green-500",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      id: 4,
      title: "Leftover Soaps 100kg",
      status: "Urgent",
      statusColor: "bg-orange-400",
      wasteType: "Organic",
      wasteColor: "bg-green-500",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      id: 5,
      title: "Leftover Soaps 100kg",
      status: "Urgent",
      statusColor: "bg-orange-400",
      wasteType: "Organic",
      wasteColor: "bg-green-500",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
      id: 6,
      title: "Orange Peels 20kg",
      status: "New",
      statusColor: "bg-green-500",
      wasteType: "Organic",
      wasteColor: "bg-green-500",
      pickupTime: "Today, Pickup at 2pm",
      location: "EcoFarms #0022",
      postedTime: "Posted 15 minutes ago",
      contact: "David at EcoFarms",
      image:
        "https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&q=80&w=120&h=120",
    },
  ];

  // Google Maps configuration
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 9.0765,
    lng: 7.3986,
  };

  const processingHubs = [
    { id: 1, name: "Kubwa Hub", position: { lat: 9.1565, lng: 7.3245 } },
    { id: 2, name: "Gwarinpa Hub", position: { lat: 9.1165, lng: 7.4086 } },
    { id: 3, name: "Kuje Hub", position: { lat: 8.8765, lng: 7.3586 } },
  ];

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar userType={userType || "partner"} />

      {/* Main Content - White background */}
      <div className="flex-1 ml-56 p-6 bg-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Good Morning Suleiman
            </h1>
            <p className="text-sm text-gray-500">
              Discover available waste, connect with businesses, and manage
              pickup requests efficiently.
            </p>
          </div>
          <button className="flex items-center gap-2 text-gray-600 text-sm">
            Dashboard
            <LayoutDashboard className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Available Waste Listings
          </h2>
          <p className="text-xs text-gray-500">
            Browse and request pickup for available waste material
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
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
                <span
                  className={`text-[10px] w-5 h-5 rounded-full flex items-center justify-center text-white ${filter.id === "all" ? "bg-gray-500" : filter.color}`}
                >
                  {filter.count}
                </span>
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
              className="w-48 pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded text-xs focus:outline-none"
            />
            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        {/* Equal 50/50 split */}
        <div className="flex gap-4">
          {/* Waste Listings - 50% */}
          <div className="w-1/2 grid grid-cols-2 gap-3">
            {wasteListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
              >
                <div className="flex gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded text-white font-medium ${listing.statusColor}`}
                      >
                        {listing.status}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded text-white font-medium ${listing.wasteColor}`}
                      >
                        {listing.wasteType}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-0.5">
                      {listing.pickupTime}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
                      <User className="w-3 h-3" />
                      <span>{listing.location}</span>
                    </div>

                    <p className="text-[10px] text-gray-400 mb-2">
                      {listing.postedTime}
                    </p>
                  </div>

                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                </div>

                <button className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white text-xs font-medium py-2 rounded mb-2">
                  Request Pickup
                </button>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">
                    {listing.contact}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-1 text-[#2E5C47] hover:bg-gray-100 rounded">
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 text-[#2E5C47] hover:bg-gray-100 rounded">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map - 50% */}
          <div className="w-1/2 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <div className="h-full min-h-[450px]">
              {apiKey ? (
                <LoadScript googleMapsApiKey={apiKey}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={11}
                  >
                    {processingHubs.map((hub) => (
                      <Marker
                        key={hub.id}
                        position={hub.position}
                        title={hub.name}
                        icon={{
                          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                        }}
                      />
                    ))}
                  </GoogleMap>
                </LoadScript>
              ) : (
                <div className="w-full h-full bg-[#E8F5E9] relative flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-[#2E5C47]" />
                    <p className="text-xs text-gray-500">
                      Add VITE_GOOGLE_MAPS_API_KEY to .env
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerHomepage;
