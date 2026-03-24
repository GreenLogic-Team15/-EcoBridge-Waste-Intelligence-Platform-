import React, { useEffect, useState } from "react";
import { Search, Calendar } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/apiClient";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { userType, user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ FIX 1: Dynamic date instead of hardcoded "15 February 2026"
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    api
      .get("/api/admin/dashboard")
      .then((res) => {
        if (cancelled) return;
        setDashboard(res.data || {});
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err.response?.data?.message ||
            "Unable to load admin dashboard. Please try again.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const overview = dashboard?.overview || {};
  const impact = dashboard?.environmentalImpact || {};
  const monthlyTrends = dashboard?.monthlyTrends || [];
  const wasteTrends = dashboard?.wasteTrends || [];

  // ✅ FIX 2: Handle all possible backend field names for activities
  // Your backend might return: recentActivities, activities, logs, data
  const rawActivities =
    dashboard?.recentActivities ||
    dashboard?.activities ||
    dashboard?.logs ||
    dashboard?.data ||
    [];

  // ✅ FIX 3: Normalize each activity — handle different backend field name shapes
  // e.g. { user, activity, status, date } OR { userName, description, status, createdAt }
  const activities = rawActivities.map((a) => ({
    user: a.user || a.userName || a.name || a.userEmail || "Unknown",
    activity: a.activity || a.description || a.action || a.type || "Activity",
    status: a.status || a.state || "—",
    date:
      a.date ||
      (a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "") ||
      (a.timestamp ? new Date(a.timestamp).toLocaleDateString() : "") ||
      "—",
  }));

  // ✅ FIX 4: Filter activities by search term
  const filteredActivities = activities.filter((a) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      a.user.toLowerCase().includes(term) ||
      a.activity.toLowerCase().includes(term) ||
      a.status.toLowerCase().includes(term)
    );
  });

  const stats = [
    {
      label: "Total Waste Generated",
      value: overview.totalWasteGeneratedKg ?? 0,
      unit: "Kg",
      change: "",
      percentage: 75,
      color: "#4A7C59",
    },
    {
      label: "Active Requests",
      value: overview.activeRequests ?? 0,
      unit: "",
      change: "",
      percentage: 60,
      color: "#4A7C59",
    },
    {
      label: "Completed Requests",
      value: overview.completedRequests ?? 0,
      unit: "",
      change: "",
      percentage: 45,
      color: "#4A7C59",
    },
    {
      label: "CO₂ Saved / SDG",
      value: impact.co2SavedKg ?? 0,
      unit: "Kg CO₂e",
      change:
        impact.sdgAligned !== undefined
          ? `SDG aligned: ${impact.sdgAligned}%`
          : "",
      percentage: impact.sdgAligned ?? 50,
      color: "#4A7C59",
    },
  ];

  const wasteChartData = monthlyTrends.map((m) => ({
    month: m.month || m.label,
    value: m.totalKg ?? m.value ?? 0,
  }));

  const wasteCategoryData = wasteTrends.map((w) => ({
    name: w.category || w.wasteCategory || w.label,
    value: w.totalKg ?? w.value ?? 0,
  }));

  const PIE_COLORS = [
    "#4A7C59",
    "#C4A484",
    "#2E5C47",
    "#7CB87C",
    "#A8D5BA",
    "#FFB74D",
  ];

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

  // ✅ FIX 5: Status badge color — handle any status string gracefully
  const getStatusColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "completed" || s === "success")
      return "text-green-600 bg-green-50";
    if (s === "pending" || s === "requested")
      return "text-yellow-600 bg-yellow-50";
    if (s === "cancelled" || s === "failed") return "text-red-600 bg-red-50";
    return "text-green-600 bg-green-50"; // default to green for unknown
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F6]">
      <Sidebar userType={userType || "admin"} />

      <div className="flex-1 ml-56 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            {/* ✅ FIX 6: Use logged-in user's name from auth context */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-1">
              Welcome {user?.name || user?.fullName || "Admin"}
            </h1>
            <p className="text-sm text-gray-500">Admin Overview</p>
          </div>
          {/* ✅ FIX 1 applied here */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {today}
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
                  {loading ? "—" : stat.value}
                </span>
                <span className="text-xs text-gray-500">{stat.unit}</span>
              </div>
              {stat.change && (
                <p className="text-xs text-green-600">{stat.change}</p>
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-4" role="alert">
            {error}
          </p>
        )}

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Waste Generation Trends */}
          <div className="bg-[#E8F5E9] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Waste Generation Trends
            </h3>
            <div className="h-48">
              {wasteChartData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-gray-500">
                  No trend data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={wasteChartData}>
                    <defs>
                      <linearGradient
                        id="wasteGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#C4A484"
                          stopOpacity={0.8}
                        />
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
              )}
            </div>
          </div>

          {/* Waste by Category */}
          <div className="bg-[#E8F5E9] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Waste by Category
            </h3>
            <div className="h-48">
              {wasteCategoryData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-gray-500">
                  No category data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={wasteCategoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label
                    >
                      {wasteCategoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${entry.name}-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Recent Activities
            </h3>
            {/* ✅ FIX 4: Search is now wired up */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              {loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 px-3 text-sm text-gray-500 text-center"
                  >
                    Loading activities…
                  </td>
                </tr>
              )}
              {!loading && filteredActivities.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 px-3 text-sm text-gray-500 text-center"
                  >
                    {searchTerm
                      ? "No activities match your search."
                      : "No recent activities found."}
                  </td>
                </tr>
              )}
              {!loading &&
                filteredActivities.map((activity, index) => (
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
                      {/* ✅ FIX 5: Dynamic status color */}
                      <span
                        className={`text-xs px-2 py-1 rounded ${getStatusColor(activity.status)}`}
                      >
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
