import React from "react";
import { LayoutDashboard, LogOut, CheckCircle, MapPin } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { WASTE_DATA, SEGREGATION_DATA } from "../data/mockData";

const PartnerDashboard = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good Morning Suleiman
          </h1>
          <p className="text-gray-500">
            Discover available waste listings and manage pick-up requests
            efficiently.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">15 February 2026</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Waste Diverted",
            value: "12,450",
            unit: "kg",
            change: "+12.5%",
            icon: LogOut,
          },
          {
            label: "Waste Segregated",
            value: "8,750",
            unit: "kg",
            change: "+5.2%",
            icon: CheckCircle,
          },
          {
            label: "Environmental Impact",
            value: "4,320",
            unit: "kg CO2e",
            change: "+3.7%",
            icon: MapPin,
          },
          {
            label: "ESG Alignment",
            value: "85",
            unit: "%",
            change: "+2.8%",
            icon: LayoutDashboard,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between"
          >
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <span className="text-xs text-gray-400">{stat.unit}</span>
              </div>
              <p className="text-xs text-green-600 mt-2 font-medium">
                {stat.change} from last month
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E5C47]">
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">
            Waste Generation Trends
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WASTE_DATA}>
                <defs>
                  <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E5C47" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2E5C47" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#2E5C47"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorWaste)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">
            Segregation Performance
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SEGREGATION_DATA}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <Tooltip
                  cursor={{ fill: "#f9fafb" }}
                  contentStyle={{ borderRadius: "8px", border: "none" }}
                />
                <Bar
                  dataKey="score"
                  fill="#2E5C47"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
