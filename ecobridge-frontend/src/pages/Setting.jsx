import React, { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Truck,
  CreditCard,
  ChevronRight,
  Camera,
} from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import { useAuth } from "../hooks/useAuth";

const Settings = () => {
  const { userType } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "pickup", label: "Pickup Preferences", icon: Truck },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F7F6]">
      <Sidebar userType={userType || "admin"} />

      <div className="flex-1 ml-56 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

        <div className="flex gap-8">
          {/* Settings Navigation */}
          <div className="w-64 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#2E5C47] text-white"
                      : "bg-white text-gray-600 hover:bg-[#E8F5E9]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          {/* Settings Content */}
          <div className="flex-1 bg-white rounded-lg p-6">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Profile Information
                </h2>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src="https://i.pravatar.cc/150?img=32"
                      alt="Profile"
                      className="w-20 h-20 rounded-full"
                    />
                    <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#4A7C59] rounded-full flex items-center justify-center text-white">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Sarah Anthony
                    </p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Sarah Anthony"
                      className="w-full bg-[#F0F5F2] border-0 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="sarah@ecobridge.com"
                      className="w-full bg-[#F0F5F2] border-0 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+234 801 234 5678"
                      className="w-full bg-[#F0F5F2] border-0 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">
                      Organization
                    </label>
                    <input
                      type="text"
                      defaultValue="EcoBridge HQ"
                      className="w-full bg-[#F0F5F2] border-0 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs text-gray-600 mb-1.5">
                    Bio
                  </label>
                  <textarea
                    rows="3"
                    className="w-full bg-[#F0F5F2] border-0 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20 resize-none"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>

                <div className="flex gap-3">
                  <button className="px-6 py-2 bg-[#4A7C59] text-white text-sm rounded-lg hover:bg-[#3d6649]">
                    Save Changes
                  </button>
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      label: "Email notifications for new pickups",
                      checked: true,
                    },
                    { label: "SMS alerts for urgent requests", checked: true },
                    { label: "Weekly activity summary", checked: false },
                    {
                      label: "Marketing and promotional emails",
                      checked: false,
                    },
                    {
                      label: "Push notifications for app updates",
                      checked: true,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-sm text-gray-700">
                        {item.label}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={item.checked}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A7C59]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Security Settings
                </h2>

                <div className="space-y-6">
                  <div className="p-4 bg-[#F0F5F2] rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Change Password
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="password"
                        placeholder="Current password"
                        className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                      />
                    </div>
                    <button className="mt-3 px-4 py-2 bg-[#4A7C59] text-white text-sm rounded-lg hover:bg-[#3d6649]">
                      Update Password
                    </button>
                  </div>

                  <div className="p-4 bg-[#F0F5F2] rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <button className="px-4 py-2 border border-[#4A7C59] text-[#4A7C59] text-sm rounded-lg hover:bg-[#E8F5E9]">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === "pickup" || activeTab === "billing") && (
              <div className="text-center py-12">
                <p className="text-gray-500">This section is coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
