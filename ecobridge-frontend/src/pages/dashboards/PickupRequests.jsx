import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Phone,
  MessageSquare,
  User,
  CheckCircle,
  Calendar,
} from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/apiClient";

// ✅ FIX 1: Define statuses right here — no need to import from a constants file.
// These strings must EXACTLY match what your backend sends back.
// If your backend sends "En-route" instead of "Accepted", update here!
const PICKUP_STATUSES = [
  { id: "Requested", label: "Requested", color: "bg-yellow-400" },
  { id: "Accepted", label: "Accepted", color: "bg-teal-500" },
  { id: "Completed", label: "Completed", color: "bg-green-500" },
  { id: "Cancelled", label: "Cancelled", color: "bg-gray-400" },
];

const PickupRequests = () => {
  const { userType } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pickups, setPickups] = useState([]);
  const [callTarget, setCallTarget] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    api
      .get("/api/pickups")
      .then((res) => {
        if (cancelled) return;
        const payload = res.data;
        const list =
          payload?.pickups ||
          payload?.data ||
          (Array.isArray(payload) ? payload : []);
        setPickups(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err.response?.data?.message ||
            "Unable to load pickup requests. Please try again.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const normalized = useMemo(() => {
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL ||
      "https://ecobridge-backend-x2uh.onrender.com";
    const text = search.trim().toLowerCase();

    const all = pickups.map((p) => {
      const id = p._id || p.id;

      // ✅ FIX 2: Status normalization — handle different backend casings
      // Some backends send "requested", others send "Requested"
      const rawStatus = p.status || p.pickupStatus || "None";
      // Capitalize first letter so "requested" → "Requested"
      const status =
        rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();
      // But keep known exact matches
      const knownStatuses = ["Requested", "Accepted", "Completed", "Cancelled"];
      const finalStatus = knownStatuses.includes(status) ? status : rawStatus;

      const wasteCategory = p.wasteCategory || p.wasteLog?.wasteCategory || "-";
      const title =
        p.title ||
        p.wasteLog?.description ||
        p.wasteSummary?.description ||
        wasteCategory;
      const pickupDate = p.pickupDate || p.availableDate || p.createdAt;
      const location = p.pickupAddress || p.wasteLog?.pickupAddress || "-";
      const updated = p.updatedAt
        ? `Updated ${new Date(p.updatedAt).toLocaleString()}`
        : "";
      const partner = p.partner || p.assignedPartner || p.collector;
      const driver =
        partner?.name || partner?.fullName
          ? `${partner?.name || partner?.fullName}`
          : "";
      const receiverId = partner?._id || partner?.id || p.partnerId || null;
      const imagePath = p.imagePath || p.wasteLog?.imagePath;
      const image = imagePath
        ? imagePath.startsWith("http")
          ? imagePath
          : `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`
        : "https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&q=80&w=120&h=120";

      // ✅ FIX 3: Progress bar now reflects correct status
      const progress =
        finalStatus === "Completed"
          ? 100
          : finalStatus === "Accepted"
            ? 60
            : finalStatus === "Requested"
              ? 30
              : 0;

      const statusColor =
        finalStatus === "Completed"
          ? "bg-[#7CB87C]"
          : finalStatus === "Accepted"
            ? "bg-teal-500"
            : finalStatus === "Requested"
              ? "bg-yellow-500"
              : finalStatus === "Cancelled"
                ? "bg-gray-400"
                : "bg-gray-400";

      return {
        id,
        status: finalStatus,
        statusColor,
        title,
        pickupDate,
        location,
        updated,
        driver,
        receiverId,
        progress,
        image,
      };
    });

    // ✅ FIX 4: Filter by active status tab (was already correct, but now uses normalized status)
    const filteredByStatus =
      activeFilter === "All"
        ? all
        : all.filter((p) => p.status === activeFilter);

    if (!text) return filteredByStatus;
    return filteredByStatus.filter((p) =>
      (p.title || "").toLowerCase().includes(text),
    );
  }, [pickups, activeFilter, search]);

  // ✅ FIX 5: Status counts use normalized statuses so badge numbers are correct
  const statusCounts = useMemo(() => {
    const counts = { Requested: 0, Accepted: 0, Completed: 0, Cancelled: 0 };
    pickups.forEach((p) => {
      const raw = p.status || p.pickupStatus || "";
      const s = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
      if (counts[s] !== undefined) counts[s] += 1;
    });
    return counts;
  }, [pickups]);

  const stats = useMemo(() => {
    const active = (statusCounts.Requested || 0) + (statusCounts.Accepted || 0);
    const activeSub = `Requested: ${statusCounts.Requested || 0}, Accepted: ${
      statusCounts.Accepted || 0
    }`;
    return [
      {
        icon: "check",
        count: `${active} Active Requests`,
        subtext: activeSub,
        color: "bg-[#A8D5BA]",
      },
      {
        icon: "check",
        count: `${statusCounts.Completed || 0} Completed Pickups`,
        subtext: "View History",
        color: "bg-[#7CB87C]",
      },
    ];
  }, [statusCounts]);

  const filters = useMemo(
    () => [
      { id: "All", label: "All", color: "bg-gray-400" },
      ...PICKUP_STATUSES,
    ],
    [],
  );

  const updateStatus = async (id, newStatus) => {
    if (!id || !newStatus) return;
    setUpdatingId(id);
    setError("");
    try {
      const res = await api.patch(`/api/pickups/${id}/status`, {
        status: newStatus,
      });
      const updated = res.data?.pickup || res.data;
      setPickups((prev) =>
        prev.map((p) => {
          if ((p._id || p.id) !== id) return p;
          return { ...p, ...(updated || {}), status: newStatus };
        }),
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update pickup status. Please try again.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ✅ FIX 6: Close button now navigates to dashboard
  const handleClose = () => {
    const dashboardPath =
      userType === "partner"
        ? "/partner-homepage"
        : userType === "admin"
          ? "/admin-dashboard"
          : "/pickup-requests";
    navigate(dashboardPath);
  };

  // ✅ FIX 7: Dynamic date
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex min-h-screen bg-[#F5F7F6]">
      <Sidebar userType={userType || "business"} />

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
            {today}
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
                <button
                  type="button"
                  onClick={() => {
                    if (stat.subtext === "View History") navigate("/history");
                  }}
                  className={`text-xs ${
                    stat.subtext === "View History"
                      ? "text-[#2E5C47] hover:underline"
                      : "text-gray-500"
                  }`}
                >
                  {stat.subtext}
                </button>
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
                <span
                  className={`w-2.5 h-2.5 rounded-full ${filter.color}`}
                ></span>
                {/* ✅ FIX 8: Show count on each filter tab */}
                {filter.id !== "All" && statusCounts[filter.id] > 0 && (
                  <span className="ml-0.5 text-[10px] font-bold">
                    {statusCounts[filter.id]}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveFilter("All");
                setSearch("");
              }}
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
              className="w-40 pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded text-xs focus:outline-none"
            />
            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        {/* Request Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {error && (
            <div className="col-span-2 text-sm text-red-600" role="alert">
              {error}
            </div>
          )}
          {loading && (
            <div className="col-span-2 text-sm text-gray-600">Loading…</div>
          )}
          {!loading && !error && normalized.length === 0 && (
            <div className="col-span-2 text-sm text-gray-500 text-center py-8">
              {activeFilter === "All"
                ? "No pickup requests yet."
                : `No "${activeFilter}" requests found.`}
            </div>
          )}
          {normalized.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg p-4 border border-gray-100"
            >
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

              <p className="text-sm text-gray-900 mb-1">
                {request.pickupDate
                  ? new Date(request.pickupDate).toLocaleString()
                  : "-"}
              </p>
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
                  className="bg-[#7CB87C] h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${request.progress}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-600">
                    {request.driver || "Unassigned"}
                  </p>
                  <div className="flex items-center gap-1">
                    <label className="text-[10px] text-gray-500">Status:</label>
                    <select
                      className="text-[10px] border border-gray-200 rounded px-1 py-0.5 bg-white"
                      value={request.status}
                      onChange={(e) => updateStatus(request.id, e.target.value)}
                      disabled={updatingId === request.id}
                    >
                      <option value="Requested">Requested</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCallTarget(request)}
                    className="p-1.5 text-[#2E5C47] hover:bg-gray-100 rounded"
                    aria-label="Call"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      navigate("/messages", {
                        state: {
                          receiverId: request.receiverId,
                          title: request.title,
                        },
                      })
                    }
                    className="p-1.5 text-[#2E5C47] hover:bg-gray-100 rounded disabled:opacity-40"
                    aria-label="Chat"
                    disabled={!request.receiverId}
                    title={
                      !request.receiverId
                        ? "No partner assigned yet"
                        : "Open chat"
                    }
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ FIX 6: Close button now actually navigates */}
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-[#4A7C59] text-white text-sm rounded hover:bg-[#3d6649] transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Call modal */}
      {callTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Calling
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {callTarget.driver || callTarget.title}
            </p>
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
    </div>
  );
};

export default PickupRequests;
