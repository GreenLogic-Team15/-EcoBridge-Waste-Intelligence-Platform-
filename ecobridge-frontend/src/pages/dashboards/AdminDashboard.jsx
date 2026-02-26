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
  const { userType } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

        // #region agent log
        fetch(
          "http://127.0.0.1:7507/ingest/56b395a6-7fc8-4b95-993b-a061c9e4db11",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Debug-Session-Id": "8f2768",
            },
            body: JSON.stringify({
              sessionId: "8f2768",
              runId: "admin-dashboard",
              hypothesisId: "admin-dashboard",
              location:
                "src/pages/dashboards/AdminDashboard.jsx:useEffect fetch",
              message: "Admin dashboard fetch failed",
              data: {
                message: err.message,
                status: err.response?.status,
                url: err.config?.url,
              },
              timestamp: Date.now(),
            }),
          },
        ).catch(() => {});
        // #endregion agent log

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
  const activities = dashboard?.recentActivities || dashboard?.activities || [];

  // Stats data with circular progress
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

  const wasteChartData =
    monthlyTrends.map((m) => ({
      month: m.month || m.label,
      value: m.totalKg ?? m.value ?? 0,
    })) || [];

  const wasteCategoryData =
    wasteTrends.map((w) => ({
      name: w.category || w.wasteCategory || w.label,
      value: w.totalKg ?? w.value ?? 0,
    })) || [];

  const PIE_COLORS = [
    "#4A7C59",
    "#C4A484",
    "#2E5C47",
    "#7CB87C",
    "#A8D5BA",
    "#FFB74D",
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
      <Sidebar userType={userType || "admin"} />

      {/* Main Content */}
      <div className="flex-1 ml-56 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-1">
              Welcome Sarah
            </h1>
            <p className="text-sm text-gray-500">
              Admin Overview
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
          {/* Waste Generation Trends (monthlyTrends) */}
          <div className="bg-[#E8F5E9] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Waste Generation Trends
            </h3>
            <div className="h-48">
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
              Waste by Category
            </h3>
            <div className="h-48">
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
