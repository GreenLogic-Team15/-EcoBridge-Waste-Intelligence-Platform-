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
import { PICKUP_STATUSES } from "../../constants/wasteOptions";

const PickupRequests = () => {
  const { userType } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pickups, setPickups] = useState([]);
  const [callTarget, setCallTarget] = useState(null);

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
          payload?.pickups || payload?.data || (Array.isArray(payload) ? payload : []);
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
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
    const text = search.trim().toLowerCase();
    const all = pickups.map((p) => {
      const id = p._id || p.id;
      const status = p.status || p.pickupStatus || "None";
      const wasteCategory = p.wasteCategory || p.wasteLog?.wasteCategory || "-";
      const title =
        p.title ||
        p.wasteLog?.description ||
        p.wasteSummary?.description ||
        `${wasteCategory}`;
      const pickupDate = p.pickupDate || p.availableDate || p.createdAt;
      const location = p.pickupAddress || p.wasteLog?.pickupAddress || "-";
      const updated = p.updatedAt ? `Updated ${new Date(p.updatedAt).toLocaleString()}` : "";
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

      const progress =
        status === "Completed"
          ? 100
          : status === "Accepted"
            ? 60
            : status === "Requested"
              ? 30
              : status === "Cancelled"
                ? 0
                : 0;

      const statusColor =
        status === "Completed"
          ? "bg-[#7CB87C]"
          : status === "Accepted"
            ? "bg-teal-500"
            : status === "Requested"
              ? "bg-yellow-500"
              : status === "Cancelled"
                ? "bg-gray-400"
                : "bg-gray-400";

      return {
        id,
        status,
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

    const filteredByStatus =
      activeFilter === "All"
        ? all
        : all.filter((p) => String(p.status) === String(activeFilter));

    if (!text) return filteredByStatus;
    return filteredByStatus.filter((p) =>
      (p.title || "").toLowerCase().includes(text),
    );
  }, [pickups, activeFilter, search]);

  const statusCounts = useMemo(() => {
    const counts = { Requested: 0, Accepted: 0, Completed: 0, Cancelled: 0, None: 0 };
    pickups.forEach((p) => {
      const s = p.status || p.pickupStatus || "None";
      if (counts[s] === undefined) counts[s] = 0;
      counts[s] += 1;
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
    () => [{ id: "All", label: "All", color: "bg-gray-400" }, ...PICKUP_STATUSES],
    [],
  );

  const handleClose = () => {
    // Close button action
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F6]">
      <Sidebar userType={userType || "business"} />

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
                <button
                  type="button"
                  onClick={() => {
                    if (stat.subtext === "View History") navigate("/history");
                  }}
                  className={`text-xs ${stat.subtext === "View History" ? "text-[#2E5C47] hover:underline" : "text-gray-500"}`}
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
                key={filter.id || filter.value}
                onClick={() => setActiveFilter(filter.id || filter.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === (filter.id || filter.value)
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                {filter.label || filter.value}
                <span
                  className={`w-2.5 h-2.5 rounded-full ${filter.color || "bg-gray-400"}`}
                ></span>
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
            <div className="col-span-2 text-sm text-gray-600">
              No requests match your filters.
            </div>
          )}
          {normalized.map((request) => (
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
                  >
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
