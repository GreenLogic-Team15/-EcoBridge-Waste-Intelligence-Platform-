import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Phone,
  MessageSquare,
  MapPin,
  User,
  LayoutDashboard,
} from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/apiClient";
import { WASTE_CATEGORIES } from "../../constants/wasteOptions";

const PartnerHomepage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [nearbyOnly, setNearbyOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [coords, setCoords] = useState(null);
  const [maxDistance, setMaxDistance] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wastes, setWastes] = useState([]);

  const [callTarget, setCallTarget] = useState(null);
  const [requestTarget, setRequestTarget] = useState(null);
  const [requestForm, setRequestForm] = useState({
    quantity: "",
    pickupDate: "",
  });
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const { userType } = useAuth();

  const filters = useMemo(() => {
    const categoryFilters = [
      { id: "", label: "All" },
      ...WASTE_CATEGORIES.map((c) => ({ id: c.value, label: c.label })),
    ];
    return [
      ...categoryFilters,
      { id: "__urgent__", label: "Urgent" },
      { id: "__nearby__", label: "Nearby" },
    ];
  }, []);

  useEffect(() => {
    if (!nearbyOnly) return;
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { enableHighAccuracy: false, timeout: 7000 },
    );
  }, [nearbyOnly]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    const params = {};
    if (category) params.category = category;
    if (urgentOnly) params.urgent = true;
    if (nearbyOnly && coords) {
      params.nearby = `${coords.lat},${coords.lng}`;
      params.maxDistance = maxDistance;
    }

    api
      .get("/api/partner/wastes", { params })
      .then((res) => {
        if (cancelled) return;
        const payload = res.data;
        const list =
          payload?.wastes ||
          payload?.data ||
          payload?.wasteLogs ||
          (Array.isArray(payload) ? payload : []);
        setWastes(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err.response?.data?.message ||
            "Unable to load available wastes. Please try again.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category, urgentOnly, nearbyOnly, coords, maxDistance]);

  const normalizedListings = useMemo(() => {
    const text = search.trim().toLowerCase();
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

    const all = wastes.map((w) => {
      const id = w._id || w.id;
      const wasteCategory = w.wasteCategory || w.category;
      const qty = w.quantity ?? w.qty;
      const title =
        w.title ||
        w.wasteSummary?.description ||
        w.description ||
        `${wasteCategory || "Waste"}${qty ? ` • ${qty}kg` : ""}`;
      const urgency = w.urgency || w.wasteSummary?.urgency;
      const statusLabel =
        urgency === "Urgent" ? "Urgent" : urgency ? String(urgency) : "Normal";
      const statusColor = urgency === "Urgent" ? "bg-red-500" : "bg-green-500";
      const categoryLabel =
        WASTE_CATEGORIES.find((c) => c.value === wasteCategory)?.label ||
        wasteCategory ||
        "-";

      const availableDate = w.availableDate || w.wasteSummary?.availableDate;
      const availableTime = w.availableTime || w.wasteSummary?.availableTime;
      const pickupTime =
        availableDate || availableTime
          ? `${availableDate || ""}${availableTime ? ` • ${availableTime}` : ""}`
          : "Pickup time not set";
      const location = w.pickupAddress || w.wasteSummary?.pickupAddress || "-";
      const postedTime = w.createdAt
        ? `Posted ${new Date(w.createdAt).toLocaleString()}`
        : "";
      const createdBy = w.createdBy || w.owner || w.business || w.user;
      const contact =
        createdBy?.name || createdBy?.fullName
          ? `${createdBy?.name || createdBy?.fullName}`
          : "Business";
      const imagePath = w.imagePath || w.wasteSummary?.imagePath;
      const image = imagePath
        ? imagePath.startsWith("http")
          ? imagePath
          : `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`
        : "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=120&h=120";

      const receiverId =
        createdBy?._id ||
        createdBy?.id ||
        w.smeId ||
        w.businessId ||
        w.userId ||
        null;

      return {
        raw: w,
        id,
        title,
        statusLabel,
        statusColor,
        categoryLabel,
        wasteColor: "bg-[#2E5C47]",
        pickupTime,
        location,
        postedTime,
        contact,
        image,
        wasteLogId: id,
        receiverId,
      };
    });

    if (!text) return all;
    return all.filter((w) => (w.title || "").toLowerCase().includes(text));
  }, [wastes, search]);

  const applyFilter = (id) => {
    if (id === "__urgent__") {
      setUrgentOnly((v) => !v);
      return;
    }
    if (id === "__nearby__") {
      setNearbyOnly((v) => !v);
      return;
    }
    setCategory(id);
  };

  const clearFilters = () => {
    setCategory("");
    setUrgentOnly(false);
    setNearbyOnly(false);
    setSearch("");
    setCoords(null);
    setMaxDistance(10000);
  };

  const openChat = (listing) => {
    navigate("/messages", {
      state: {
        receiverId: listing.receiverId,
        wasteLogId: listing.wasteLogId,
        title: listing.title,
      },
    });
  };

  const submitPickupRequest = async () => {
    if (!requestTarget) return;
    setRequestError("");
    setRequestLoading(true);
    try {
      await api.post("/api/partner/request-pickup", {
        wasteLogId: requestTarget.wasteLogId,
        quantity: Number(requestForm.quantity || 0),
        pickupDate: requestForm.pickupDate,
      });
      setRequestTarget(null);
      setRequestForm({ quantity: "", pickupDate: "" });
    } catch (err) {
      setRequestError(
        err.response?.data?.message ||
          "Unable to request pickup. Please try again.",
      );
    } finally {
      setRequestLoading(false);
    }
  };

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
                onClick={() => applyFilter(filter.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  (filter.id && filter.id === category) ||
                  (filter.id === "" && category === "") ||
                  (filter.id === "__urgent__" && urgentOnly) ||
                  (filter.id === "__nearby__" && nearbyOnly)
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
            <button
              onClick={clearFilters}
              className="text-xs text-[#2E5C47] font-medium ml-2"
            >
              Clear filter
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded text-xs focus:outline-none"
            />
            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        {/* Equal 50/50 split */}
        <div className="flex gap-4">
          {/* Waste Listings - 50% */}
          <div className="w-1/2 grid grid-cols-2 gap-3">
            {error && (
              <div className="col-span-2 text-sm text-red-600" role="alert">
                {error}
              </div>
            )}
            {loading && (
              <div className="col-span-2 text-sm text-gray-600">Loading…</div>
            )}
            {!loading && !error && normalizedListings.length === 0 && (
              <div className="col-span-2 text-sm text-gray-600">
                No waste listings match your filters.
              </div>
            )}
            {normalizedListings.map((listing) => (
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
                        {listing.statusLabel}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded text-white font-medium ${listing.wasteColor}`}
                      >
                        {listing.categoryLabel}
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

                <button
                  onClick={() => {
                    setRequestTarget(listing);
                    setRequestError("");
                    setRequestForm({ quantity: "", pickupDate: "" });
                  }}
                  className="w-full bg-[#4A7C59] hover:bg-[#3d6649] text-white text-xs font-medium py-2 rounded mb-2"
                >
                  Request Pickup
                </button>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">
                    {listing.contact}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCallTarget(listing)}
                      className="p-1 text-[#2E5C47] hover:bg-gray-100 rounded"
                      aria-label="Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openChat(listing)}
                      className="p-1 text-[#2E5C47] hover:bg-gray-100 rounded disabled:opacity-40"
                      aria-label="Chat"
                      disabled={!listing.receiverId}
                      title={!listing.receiverId ? "Missing recipient" : "Open chat"}
                    >
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

      {/* Simple call modal */}
      {callTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Calling
            </h3>
            <p className="text-sm text-gray-600 mb-4">{callTarget.contact}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setCallTarget(null)}
                className="px-4 py-2 text-sm rounded border border-gray-200 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => setCallTarget(null)}
                className="px-4 py-2 text-sm rounded bg-[#4A7C59] text-white hover:bg-[#3d6649]"
              >
                End call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request pickup modal */}
      {requestTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Request pickup
            </h3>
            <p className="text-xs text-gray-600 mb-4">{requestTarget.title}</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  value={requestForm.quantity}
                  onChange={(e) =>
                    setRequestForm((p) => ({ ...p, quantity: e.target.value }))
                  }
                  className="w-full bg-[#F0F5F2] border-0 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Pickup date
                </label>
                <input
                  type="date"
                  value={requestForm.pickupDate}
                  onChange={(e) =>
                    setRequestForm((p) => ({ ...p, pickupDate: e.target.value }))
                  }
                  className="w-full bg-[#F0F5F2] border-0 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                />
              </div>
            </div>

            {requestError && (
              <p className="text-sm text-red-600 mt-3" role="alert">
                {requestError}
              </p>
            )}

            <div className="flex gap-3 justify-end mt-5">
              <button
                onClick={() => setRequestTarget(null)}
                className="px-4 py-2 text-sm rounded border border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitPickupRequest}
                disabled={requestLoading}
                className="px-4 py-2 text-sm rounded bg-[#4A7C59] text-white hover:bg-[#3d6649]"
              >
                {requestLoading ? "Submitting…" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerHomepage;
