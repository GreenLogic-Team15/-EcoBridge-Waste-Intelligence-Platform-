import React, { useState, useEffect } from "react";
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
import { api } from "../services/apiClient";

const Settings = () => {
  const { userType } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    bio: "",
  });

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Try to get from localStorage first for speed
        const cachedName = localStorage.getItem("userName");
        const cachedEmail = localStorage.getItem("userEmail");
        const cachedBusiness = localStorage.getItem("businessName");

        if (cachedName) {
          setFormData((prev) => ({
            ...prev,
            fullName: cachedName,
            email: cachedEmail || "",
            organization: cachedBusiness || "",
          }));
        }

        // Then fetch fresh data from API
        const response = await api.get("/api/auth/me");
        const userData = response.data;

        setUser(userData);
        setFormData({
          fullName: userData.fullName || userData.name || cachedName || "",
          email: userData.email || cachedEmail || "",
          phone: userData.phone || "",
          organization: userData.businessName || cachedBusiness || "",
          bio: userData.bio || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        // Fallback to localStorage if API fails
        setFormData({
          fullName: localStorage.getItem("userName") || "",
          email: localStorage.getItem("userEmail") || "",
          organization: localStorage.getItem("businessName") || "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await api.put("/api/auth/profile", formData);
      // Update localStorage with new values
      localStorage.setItem("userName", formData.fullName);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("businessName", formData.organization);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "pickup", label: "Pickup Preferences", icon: Truck },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F5F7F6]">
        <Sidebar userType={userType || "admin"} />
        <div className="flex-1 ml-56 flex items-center justify-center">
          <div className="text-gray-600">Loading profile...</div>
        </div>
      </div>
    );
  }

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

                {message && (
                  <div
                    className={`mb-4 p-3 rounded ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {message}
                  </div>
                )}

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-[#4A7C59] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {(formData.fullName || "U").charAt(0).toUpperCase()}
                    </div>
                    <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#4A7C59] rounded-full flex items-center justify-center text-white">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formData.fullName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {userType || "User"}
                    </p>
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
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-[#F0F5F2] border-0 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#F0F5F2] border-0 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+234..."
                      className="w-full bg-[#F0F5F2] border-0 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organization: e.target.value,
                        })
                      }
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
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="w-full bg-[#F0F5F2] border-0 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C47]/20 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-[#4A7C59] text-white text-sm rounded-lg hover:bg-[#3d6649] disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50"
                  >
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
